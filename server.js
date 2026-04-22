import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = Number(process.env.PORT) || 3000;
const OPENAI_API_KEY = loadOpenAiKey();
const OPENAI_TRANSLATION_MODEL = process.env.OPENAI_TRANSLATION_MODEL || 'gpt-5.4-mini';

const STATIC_FILES = {
  '/': 'index.html',
  '/index.html': 'index.html',
  '/styles.css': 'styles.css',
  '/script.js': 'script.js'
};

const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8'
};

createServer(async (request, response) => {
  try {
    if (request.method === 'POST' && request.url === '/api/translate') {
      await handleTranslateRequest(request, response);
      return;
    }

    if (request.method === 'GET') {
      await serveStaticFile(request.url || '/', response);
      return;
    }

    sendJson(response, 405, { error: 'Method not allowed.' });
  } catch (error) {
    sendJson(response, 500, {
      error: error instanceof Error ? error.message : 'Unexpected server error.'
    });
  }
}).listen(PORT, () => {
  console.log(`Umuganda-T server running on http://localhost:${PORT}`);
});

function loadOpenAiKey() {
  if (process.env.OPENAI_API_KEY) {
    return process.env.OPENAI_API_KEY;
  }

  try {
    const envPath = path.join(__dirname, '.env');
    const envContent = requireEnvFile(envPath);
    return envContent.OPENAI_API_KEY || '';
  } catch {
    return '';
  }
}

function requireEnvFile(envPath) {
  const envContent = readEnvFileSync(envPath);
  const result = {};

  envContent.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) return;

    const separatorIndex = trimmed.indexOf('=');
    const key = trimmed.slice(0, separatorIndex).trim();
    const rawValue = trimmed.slice(separatorIndex + 1).trim();
    const value = rawValue.replace(/^['"]|['"]$/g, '');
    result[key] = value;

    if (!process.env[key]) {
      process.env[key] = value;
    }
  });

  return result;
}

function readEnvFileSync(envPath) {
  return readFileSync(envPath, 'utf8');
}

async function serveStaticFile(urlPath, response) {
  const safePath = STATIC_FILES[urlPath];
  if (!safePath) {
    sendJson(response, 404, { error: 'Not found.' });
    return;
  }

  const filePath = path.join(__dirname, safePath);
  const extension = path.extname(filePath);
  const content = await readFile(filePath);

  response.writeHead(200, {
    'Content-Type': CONTENT_TYPES[extension] || 'application/octet-stream'
  });
  response.end(content);
}

async function handleTranslateRequest(request, response) {
  const body = await readJsonBody(request);
  const targetLanguage = typeof body?.targetLanguage === 'string' ? body.targetLanguage.trim() : '';
  const texts = Array.isArray(body?.texts)
    ? body.texts.filter((item) => typeof item === 'string').map((item) => item.trim())
    : [];

  if (!targetLanguage || texts.length === 0) {
    sendJson(response, 400, { error: 'Provide targetLanguage and a non-empty texts array.' });
    return;
  }

  if (!OPENAI_API_KEY) {
    sendJson(response, 503, {
      error: 'OPENAI_API_KEY is missing. Add it to your environment or .env file.'
    });
    return;
  }

  const schema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      translations: {
        type: 'array',
        items: { type: 'string' },
        minItems: texts.length,
        maxItems: texts.length
      }
    },
    required: ['translations']
  };

  const openAiResponse = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: OPENAI_TRANSLATION_MODEL,
      input: [
        {
          role: 'system',
          content: [
            {
              type: 'input_text',
              text:
                'You are a precise translation engine. Translate each text into the requested target language. Preserve names, email addresses, numbers, placeholders like {name}, QR, SMS, RWF, OpenAI, and any ids. Return strict JSON only.'
            }
          ]
        },
        {
          role: 'user',
          content: [
            {
              type: 'input_text',
              text: JSON.stringify({
                targetLanguage,
                texts
              })
            }
          ]
        }
      ],
      text: {
        format: {
          type: 'json_schema',
          name: 'translation_result',
          strict: true,
          schema
        }
      }
    })
  });

  if (!openAiResponse.ok) {
    const errorText = await openAiResponse.text();
    sendJson(response, openAiResponse.status, {
      error: 'OpenAI translation request failed.',
      details: errorText
    });
    return;
  }

  const payload = await openAiResponse.json();
  const rawText =
    payload.output_text ||
    payload.output?.flatMap((item) => item.content || []).find((item) => item.type === 'output_text')?.text ||
    '';

  if (!rawText) {
    sendJson(response, 502, { error: 'No translation content returned by OpenAI.' });
    return;
  }

  const parsed = JSON.parse(rawText);
  if (!Array.isArray(parsed.translations) || parsed.translations.length !== texts.length) {
    sendJson(response, 502, { error: 'OpenAI returned an invalid translation payload.' });
    return;
  }

  sendJson(response, 200, { translations: parsed.translations });
}

function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    const chunks = [];

    request.on('data', (chunk) => {
      chunks.push(chunk);
    });

    request.on('end', () => {
      if (chunks.length === 0) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')));
      } catch (error) {
        reject(new Error('Invalid JSON body.'));
      }
    });

    request.on('error', reject);
  });
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8'
  });
  response.end(JSON.stringify(payload));
}
