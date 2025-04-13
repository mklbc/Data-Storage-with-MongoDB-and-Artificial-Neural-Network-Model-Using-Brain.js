const { MongoClient } = require('mongodb');


const uri = "mongodb://127.0.0.1:27017";

// MongoDB istemcisini başlat
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log(" Successfully connected to MongoDB!");

        const db = client.db("neuralDB");
        const collection = db.collection("trainingData");

        // Örnek veri ekleme
        const sampleData = [
            { input: [0, 0], output: [0] },
            { input: [0, 1], output: [1] },
            { input: [1, 0], output: [1] },
            { input: [1, 1], output: [0] }
        ];

        await collection.insertMany(sampleData);
        console.log("Data added successfully!");

        // Eklenen verileri göster
        const data = await collection.find().toArray();
        console.log("Database data:", data);

    } catch (error) {
        console.error("Error occurred:", error);
    } finally {
        await client.close();
    }
}

// Fonksiyonu çalıştır
connectDB();
