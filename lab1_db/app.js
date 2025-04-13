const brain = require('brain.js');
const { MongoClient } = require('mongodb');

// MongoDB bağlantısı
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function fetchDataAndTrainModel() {
    try {
        await client.connect();
        console.log("✅ MongoDB'ye başarıyla bağlandı!");

        const db = client.db("neuralDB");
        const collection = db.collection("trainingData");

        // MongoDB'den verileri al
        const data = await collection.find().toArray();

        // Eğer veri yoksa hata ver
        if (data.length === 0) {
            console.log("No data found in the database!");
            return;
        }

        console.log("Data taken from the database:", data);

        // MongoDB'deki veriyi, Brain.js'in anlayacağı formata dönüştür
        const trainingData = data.map(item => ({
            input: item.input,
            output: item.output
        }));

        console.log("Data used for training:", trainingData);

        // Yapay sinir ağı modelini oluştur
        const net = new brain.NeuralNetwork();

        // Modeli eğit
        console.log("Artificial neural network is being trained...");
        net.train(trainingData, {
            log: (stats) => console.log(stats), // Her epoch sonrası log göster
            logPeriod: 100, // Her 100 iterasyonda log al
        });

        // Test verisi
        console.log("Test Result 0.1:", net.run([0, 1]));
        console.log("Test Result 1.1:", net.run([1, 1]));
        console.log("Model successfully trained and tested!");

    } catch (error) {
        console.error("Error occurred:", error);
    } finally {
        await client.close();
    }
}

// Fonksiyonu çalıştır
fetchDataAndTrainModel();
