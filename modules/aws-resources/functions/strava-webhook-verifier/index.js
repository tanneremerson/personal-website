exports.handler = async (event, context) => {
  console.log({ msg: "Event/Context data", event, context });
  console.log({
    msg: "Strava Challenge Information",
    meta: event.queryStringParameters,
  });

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      "hub.challenge": event.queryStringParameters["hub.challenge"],
    }),
  };

  console.log({ msg: "Response to Strava", response });

  return response;
};
