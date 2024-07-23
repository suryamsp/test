import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';

const app = express();
const PORT = 4000; 
const mongo_url = "mongodb+srv://suryamsp:4119@cluster0.zgm9qml.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const allowedOrigins = ['http://localhost:5173', 'https://snegamsp.netlify.app'];

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use((request, response, next) => {
  const origin = request.headers.origin;
  if (allowedOrigins.includes(origin)) {
    response.header('Access-Control-Allow-Origin', origin);
  }
  response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const client = new MongoClient(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true });

async function main() {
  try {
    // Connect to the MongoDB client
    await client.connect();
    console.log('Connected to MongoDB');

    app.get("/", async function (request, response) {
      try {
        const list = await client
          .db("oladb")
          .collection("olaname")
          .find({})
          .toArray();
        response.send(list);
      } catch (err) {
        console.error(err);
        response.status(500).send("Error retrieving data from database");
      }
    });

    app.listen(PORT, () => console.log(`The server started on port: ${PORT} ✨✨`));
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
    process.exit(1);
  }
}

main().catch(console.error);

// Gracefully close the MongoDB client connection when the app is terminated
process.on('SIGINT', async () => {
  await client.close();
  console.log('MongoDB client disconnected');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await client.close();
  console.log('MongoDB client disconnected');
  process.exit(0);
});
