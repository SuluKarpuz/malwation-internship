const { MongoClient } = require("mongodb");

const connectionString = "mongodb://127.0.0.1:27017/index-deneme";

async function benchmarkCollection() {
  const client = new MongoClient(connectionString, {
    useUnifiedTopology: true,
  });
  let startTime, endTime;

  try {
    console.log("indexed started...");
    await client.connect();
    const db = client.db();
    const collection = db.collection("indexed");

    const query = { rating: 8 };

    startTime = performance.now();

    for (let i = 0; i < 1000; i++) {
      await collection.find(query).toArray();
    }

    endTime = performance.now();
  } catch (err) {
    console.error("Error occurred:", err);
  } finally {
    client.close();
  }

  const totalTimeTaken = endTime - startTime;
  console.log(`Total time taken for 1000 queries: ${totalTimeTaken}ms`);
}

benchmarkCollection();
