async function translateTexts(config, targetLanguage, texts) {
  if (!config.openAiApiKey) {
    return texts;
  }

  const schema = {
    type: "object",
    additionalProperties: false,
    properties: {
      translations: {
        type: "array",
        items: { type: "string" },
        minItems: texts.length,
        maxItems: texts.length
      }
    },
    required: ["translations"]
  };

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.openAiApiKey}`
    },
    body: JSON.stringify({
      model: config.openAiTranslationModel,
      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text:
                "Translate each string into the requested target language. Preserve placeholders, numbers, ids, and names. Return strict JSON only."
            }
          ]
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: JSON.stringify({ targetLanguage, texts })
            }
          ]
        }
      ],
      text: {
        format: {
          type: "json_schema",
          name: "translation_result",
          strict: true,
          schema
        }
      }
    })
  });

  if (!response.ok) {
    const error = new Error("OpenAI translation request failed.");
    error.statusCode = response.status;
    throw error;
  }

  const payload = await response.json();
  const outputText =
    payload.output_text ||
    payload.output
      ?.flatMap((entry) => entry.content || [])
      .find((entry) => entry.type === "output_text")?.text ||
    "";

  if (!outputText) {
    return texts;
  }

  const parsed = JSON.parse(outputText);
  return Array.isArray(parsed.translations) ? parsed.translations : texts;
}

exports.getHealth = async (req, res) => {
  res.json({
    message: "Umuganda-T is running.",
    mode: req.app.locals.config.dataMode
  });
};

exports.getBootstrap = async (req, res, next) => {
  try {
    const dataService = req.app.locals.dataService;
    res.json(await dataService.getBootstrap());
  } catch (error) {
    next(error);
  }
};

exports.getDashboard = async (req, res, next) => {
  try {
    const dataService = req.app.locals.dataService;
    res.json(await dataService.getDashboard(req.currentUser));
  } catch (error) {
    next(error);
  }
};

exports.submitFeedback = async (req, res, next) => {
  try {
    const dataService = req.app.locals.dataService;
    const feedback = await dataService.submitFeedback({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
      userId: req.currentUser?.id || null
    });

    res.status(201).json({
      message: "Feedback submitted successfully.",
      feedback
    });
  } catch (error) {
    next(error);
  }
};

exports.submitContact = async (req, res, next) => {
  try {
    const dataService = req.app.locals.dataService;
    const contact = await dataService.submitContact({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message
    });

    res.status(201).json({
      message: "Message sent successfully.",
      contact
    });
  } catch (error) {
    next(error);
  }
};

exports.translate = async (req, res, next) => {
  try {
    const targetLanguage = String(req.body.targetLanguage || "").trim();
    const texts = Array.isArray(req.body.texts)
      ? req.body.texts.filter((item) => typeof item === "string").map((item) => item.trim())
      : [];

    if (!targetLanguage || texts.length === 0) {
      const error = new Error("Provide targetLanguage and a non-empty texts array.");
      error.statusCode = 400;
      throw error;
    }

    const translations = await translateTexts(
      req.app.locals.config,
      targetLanguage,
      texts
    );

    res.json({ translations });
  } catch (error) {
    next(error);
  }
};
