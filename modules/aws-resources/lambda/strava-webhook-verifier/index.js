const { STRAVA_VERIFY_TOKEN } = process.env;

function validateChallenge(event) {
  console.log({
    msg: "Strava Challenge Information",
    meta: event.queryStringParameters,
  });

  if (event.queryStringParameters["hub.verify_token"] !== STRAVA_VERIFY_TOKEN) {
    console.log({
      msg: "Did not provide the correct challenge",
    });
    return { statusCode: 401 };
  }

  console.log({ msg: "Challenge Accepted, returning success" });

  return {
    statusCode: 200,
    body: JSON.stringify({
      "hub.challenge": event.queryStringParameters["hub.challenge"],
    }),
  };
}

exports.handler = async (event, context) => {
  console.log({ msg: "Event/Context data", event, context });

  return validateChallenge(event);
};
