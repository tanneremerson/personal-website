const axios = require("axios");

async function updateAccessToken() {
  console.log({ msg: "Updating Strava access token" });
}

function baseRequest(params) {
  return {
    baseURL: params.STRAVA_URL,
    parameters: {
      client_id: params.STRAVA_CLIENT_ID,
      client_secret: params.STRAVA_CLIENT_SECRET,
    },
  };
}

async function createWebhook(params) {
  console.log({ msg: "Setting up Strava webhook" });

  const response = await axios({
    ...baseRequest(params),
    method: "POST",
    url: "/push_subscriptions",
    params: {
      client_id: params.STRAVA_CLIENT_ID,
      client_secret: params.STRAVA_CLIENT_SECRET,
      callback_url: `${params.API_GATEWAY_URL}strava/event`,
      verify_token: params.STRAVA_VERIFY_TOKEN,
    },
  })
    .then((r) => r.data)
    .catch((error) => {
      console.log(error.response.data);
      console.log(error.response.headers);
      throw new Error("Something went wrong while creating webhook");
    });

  console.log({ msg: "Strava Response", response });

  return response;
}

async function readWebhooks(params) {
  console.log({ msg: "Reading Active Strava webhooks" });

  const response = await axios({
    ...baseRequest(params),
    method: "GET",
    url: "push_subscriptions",
  });

  console.log({ msg: "Strava Response", response });
}

async function deleteWebhook(params, id) {
  console.log({ msg: "Deleting up Strava webhook" });

  const response = await axios({
    ...baseRequest(params),
    method: "DELETE",
    url: `push_subscriptions/${id}`,
  });

  console.log({ msg: "Strava Response", response });
}

module.exports = {
  createWebhook,
  readWebhooks,
  deleteWebhook,
};
