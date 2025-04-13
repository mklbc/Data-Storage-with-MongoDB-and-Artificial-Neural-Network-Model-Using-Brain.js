const { MongoClient } = require('mongodb');

const uri = "mongodb://127.0.0.1:27017"; // Bağlantı adresi
const client = new MongoClient(uri);

async function insertData() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");

        const db = client.db("neuralDB");
        const collection = db.collection("trainingData");

        // Örnek eğitim verisi
        const trainingData = [
            { input: [0, 0], output: [0] },
            { input: [0, 1], output: [1] },
            { input: [1, 0], output: [1] },
            { input: [1, 1], output: [0] }
        ];

        const result = await collection.insertMany(trainingData);
        console.log(`✅ ${result.insertedCount} data added successfully!`);

    } catch (error) {
        console.error("Error occurred:", error);
    } finally {
        await client.close();
    }
}

// Fonksiyonu çalıştır
insertData();
