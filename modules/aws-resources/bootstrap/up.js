#!/usr/bin/env node

const parameters = require('./parameters.js');
const strava = require('./strava');

async function main() {
  const params = await parameters.getParameters();

  await strava.createWebhook(params);
}

(async () => {
  await main();
})();
