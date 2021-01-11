#!/usr/bin/env node

const parameters = require('./parameters.js');
const strava = require('./strava');

async function main() {
  const params = await parameters.getParameters();

  const webhookList = await strava.readWebhooks(params);

  const promises = webhookList.map((w) => strava.deleteWebhook(params, w.id));

  await Promise.all(promises);
}

(async () => {
  await main();
})();
