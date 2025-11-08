import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const dbName = "portfolioContact"; // same as your MongoDB database name

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection("messages");

      const newMessage = {
        name,
        email,
        subject,
        message,
        date: new Date(),
      };

      await collection.insertOne(newMessage);
      res.status(201).json({ message: "Message saved successfully" });
    } catch (error) {
      console.error("Error saving message:", error);
      res.status(500).json({ error: "Failed to save message" });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
