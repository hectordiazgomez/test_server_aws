import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;

let data = [
    { id: 1, name: "Item 1", value: 100 },
    { id: 2, name: "Item 2", value: 200 },
    { id: 3, name: "Item 3", value: 300 },
];

app.get("/", (req, res) => {
    res.json({ message: "Hola amiguis xd x6" });
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

app.put("/update", (req, res) => {
    const { id, newData } = req.body;

    const item = data.find(d => d.id === parseInt(id));

    if (!item) {
        return res.status(404).json({ error: `Item with ID ${id} not found` });
    }

    // Update the item's properties with newData
    Object.assign(item, newData);

    res.json({ message: `Data with ID ${id} has been updated`, updatedItem: item });
});

const host = '0.0.0.0';

app.listen(port, host, () => {
  console.log(`App running on ${host}:${port}`);
});
