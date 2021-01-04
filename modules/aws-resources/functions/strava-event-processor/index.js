const axios = require("axios");

exports.handler = async (event, context) => {
  console.log({ msg: "Event/Context data", event, context });

  const records = event.Records;
  if (!records) return;
  console.log({ msg: "List of Records", records });

  // TODO: Need to figure out how we are going to store the data
  for (let i = 0; i < records.length; i++) {
    const record = records[i];
    console.log({ msg: "Processing Record", record });
    const body = JSON.parse(record.body);
    console.log({ msg: "Record Body", body });
  }

  console.log({ msg: "Processing Complete" });

  return;
};
