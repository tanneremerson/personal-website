const AWS = require("aws-sdk");

// Checks if the event was provided and if it is of the correct type.
// Returns the message as an object if exists and is of type create, else null;
function getEventBody(event) {
  const { body } = event;

  if (!body) return null;
  console.log({ msg: "Event body", body });

  const parsedBody = JSON.parse(body);

  return parsedBody.aspect_type === "create" ? parsedBody : null;
}

exports.handler = async (event, context) => {
  console.log({ msg: "Event/Context data", event, context });

  const eventBody = getEventBody(event);
  if (!eventBody) {
    console.log({ msg: "Incorrect action type, returning early" });
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  }

  const sqs = new AWS.SQS();

  const params = {
    MessageBody: JSON.stringify(eventBody),
    QueueUrl: process.env.QUEUE_URL,
  };

  return sqs
    .sendMessage(params)
    .promise()
    .then((data) => {
      console.log({ msg: "Successfully sent message to queue", data });
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true }),
      };
    })
    .catch((err) => {
      console.log({ msg: "Failed to send message to queue", err });
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false }),
      };
    });
};
