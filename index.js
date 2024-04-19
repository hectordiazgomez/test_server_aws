import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

const port = 5500;

app.get("/", (req, res) => {
    res.json({ analysis: "Hola a todos" });
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});