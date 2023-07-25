function closeChangeStream(timeInMs = 60000, changeStream) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Closing the change stream");
      resolve(changeStream.close());
    }, timeInMs)
  })
};

async function monitorListingsUsingEventEmitter(client, timeInMs = 60000, pipeline = []){
  await closeChangeStream(timeInMs, changeStream);
}

const collection = client.db("events").collection("listingsAndReviews");

const changeStream = collection.watch(pipeline);

changeStream.on('change', (next) => {
  console.log(next);
});