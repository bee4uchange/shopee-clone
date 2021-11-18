const express = require("express");
const mongodb = require("mongodb");
const cors = require("cors");

const app = express();

app.use(express.static('public'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let db = null;

async function startServer() {
    const client = await mongodb.MongoClient.connect(
        "mongodb://localhost:27017/shopee"
    );
    db = client.db();
    app.listen(3000);
    console.log("Listening port 3000");
}

app.get("/products", async function (req, res) {
    const result = await db.collection("products").find("").toArray();

    res.status(201).json(result);
});

app.post("/products/:id/view", async function (req, res) {
    const id = req.params.id;
    const result = await db.collection("products").findOne({_id: mongodb.ObjectId(id)});

    res.status(200).json(result);
});

startServer();
