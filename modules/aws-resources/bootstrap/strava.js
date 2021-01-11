const axios = require('axios');

function baseRequest(params) {
  return {
    baseURL: params.STRAVA_URL,
    params: {
      client_id: params.STRAVA_CLIENT_ID,
      client_secret: params.STRAVA_CLIENT_SECRET,
    },
  };
}

async function sendRequest(request, params) {
  return axios({
    ...baseRequest(params),
    ...request,
  })
    .then((r) => {
      console.log({ msg: 'Strava Response', response: r.data });
      return r.data;
    })
    .catch((e) => {
      console.log({
        msg: 'Something went wrong',
        headers: e.response.headers,
        data: e.response.data,
      });
      throw new Error('Something went wrong while sending request to Strava');
    });
}

async function createWebhook(params) {
  console.log({ msg: 'Setting up Strava webhook' });

  const request = {
    method: 'POST',
    url: '/push_subscriptions',
    params: {
      client_id: params.STRAVA_CLIENT_ID,
      client_secret: params.STRAVA_CLIENT_SECRET,
      callback_url: `${params.API_GATEWAY_URL}strava/event`,
      verify_token: params.STRAVA_VERIFY_TOKEN,
    },
  };

  return sendRequest(request, params);
}

async function readWebhooks(params) {
  console.log({ msg: 'Reading Active Strava webhooks' });

  const request = {
    method: 'GET',
    url: 'push_subscriptions',
  };

  return sendRequest(request, params);
}

async function deleteWebhook(params, id) {
  console.log({ msg: 'Deleting Strava webhook', id });

  const request = {
    method: 'DELETE',
    url: `push_subscriptions/${id}`,
  };

  return sendRequest(request, params);
}

module.exports = {
  createWebhook,
  readWebhooks,
  deleteWebhook,
};
