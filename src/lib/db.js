import "server-only";

const { MongoClient, ServerApiVersion } = require("mongodb");

if (!process.env.DB_URI) {
  throw new Error("Mongo URI not found");
}

const client = new MongoClient(process.env.DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});


const getDB = async(dbName) => {
    try {
        await client.connect();
        console.log(">>>>>>Connected to the DB<<<<<<");
        return client.db(dbName);
    } catch (error) {
        console.log(error);
    }
}

export const getCollection = async (collectionName) => {
    const db = await getDB('blog_db')
    if (db) {
        return db.collection(collectionName)
    }
    return null;
}
