const assert = require("node:assert/strict");
const { rm } = require("node:fs/promises");
const os = require("node:os");
const path = require("node:path");

const tempDataFile = path.join(
  os.tmpdir(),
  `umuganda-demo-test-${Date.now()}.json`
);

process.env.PORT = "0";
process.env.DEMO_DATA_FILE = tempDataFile;
process.env.JWT_SECRET = "test-secret";

const { startServer } = require("../index");

async function requestJson(url, options = {}) {
  const response = await fetch(url, options);
  const payload = await response.json();

  return {
    ok: response.ok,
    status: response.status,
    payload
  };
}

async function main() {
  const serverContext = await startServer();
  const port = serverContext.server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    const rootResponse = await fetch(baseUrl);
    const rootHtml = await rootResponse.text();
    const bootstrapResponse = await requestJson(`${baseUrl}/api/bootstrap`);

    assert.equal(rootResponse.status, 200);
    assert.match(rootHtml, /Umuganda-T/i);
    assert.equal(bootstrapResponse.status, 200);
    assert.ok(Array.isArray(bootstrapResponse.payload.events));
    assert.ok(bootstrapResponse.payload.events.length > 0);

    const adminLogin = await requestJson(`${baseUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        identifier: "admin@umuganda.rw",
        password: "admin123",
        role: "admin"
      })
    });

    assert.equal(adminLogin.status, 200);
    assert.ok(adminLogin.payload.token);

    const leaderLogin = await requestJson(`${baseUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        identifier: "leader@umuganda.rw",
        password: "leader123",
        role: "leader"
      })
    });

    assert.equal(leaderLogin.status, 200);
    const leaderToken = leaderLogin.payload.token;
    const eventId = leaderLogin.payload.dashboard.events[0].id;
    const assigneeId = leaderLogin.payload.dashboard.members[0].id;

    const createTask = await requestJson(`${baseUrl}/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${leaderToken}`
      },
      body: JSON.stringify({
        eventId,
        assignedTo: assigneeId,
        description: "Coordinate tool pickup"
      })
    });

    assert.equal(createTask.status, 201);
    assert.equal(createTask.payload.task.description, "Coordinate tool pickup");

    const citizenLogin = await requestJson(`${baseUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        identifier: "pierre@umuganda.rw",
        password: "pass123",
        role: "citizen"
      })
    });

    assert.equal(citizenLogin.status, 200);
    const citizenToken = citizenLogin.payload.token;

    const attendance = await requestJson(`${baseUrl}/api/attendance/mark`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${citizenToken}`
      },
      body: JSON.stringify({
        eventId,
        qrData: `umuganda:event:${eventId}`
      })
    });

    assert.equal(attendance.status, 200);
    assert.equal(attendance.payload.attendance.status, "present");

    const deposit = await requestJson(`${baseUrl}/api/payments/deposit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${citizenToken}`
      },
      body: JSON.stringify({
        amount: 2500
      })
    });

    assert.equal(deposit.status, 200);
    assert.ok(deposit.payload.collectedAmount >= 14500);

    console.log("API smoke test passed.");
  } finally {
    await new Promise((resolve, reject) => {
      serverContext.server.close((error) => {
        if (error) reject(error);
        else resolve();
      });
    });
    await rm(tempDataFile, { force: true });
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
