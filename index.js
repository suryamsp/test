import express from 'express';
const app = express();
import { MongoClient } from "mongodb";
import cors from "cors";




app.use(express.json());


const PORT = 4000; 
const mongo_url = "mongodb+srv://suryamsp:4119@cluster0.zgm9qml.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const allowedOrigins = ['http://localhost:5173','https://snegamsp.netlify.app'];

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


export const client = new MongoClient(mongo_url);
console.log("mongodb is connected soon ila ");


try {
    await client.connect();
    console.log("MongoDB is connected soon");
} catch (error) {
    console.error("Error connecting to MongoDB:", error);
}





app.get("/", async function (request, response) {
  const list= await client
  .db("oladb")
  .collection("olaname")
  .find({})
  .toArray();
  response.send(list);
});
app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
