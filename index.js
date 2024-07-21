import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const port = 80;

app.get("/", (req, res) => {
    res.json({ message: "Welcome to the API" });
});

app.get("/hello", (req, res) => {
    res.json({ greeting: "Hola a todos" });
});

app.post("/echo", (req, res) => {
    const { message } = req.body;
    res.json({ echo: message });
});

app.get("/math/:operation", (req, res) => {
    const { operation } = req.params;
    const { a, b } = req.query;

    const num1 = parseFloat(a);
    const num2 = parseFloat(b);

    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ error: "Invalid numbers provided" });
    }

    let result;
    switch (operation) {
        case "add":
            result = num1 + num2;
            break;
        case "subtract":
            result = num1 - num2;
            break;
        case "multiply":
            result = num1 * num2;
            break;
        case "divide":
            if (num2 === 0) {
                return res.status(400).json({ error: "Cannot divide by zero" });
            }
            result = num1 / num2;
            break;
        default:
            return res.status(400).json({ error: "Invalid operation" });
    }

    res.json({ result });
});

app.get("/random", (req, res) => {
    const min = parseInt(req.query.min) || 0;
    const max = parseInt(req.query.max) || 100;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    res.json({ number: randomNumber });
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
