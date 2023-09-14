import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send(`<h1>Hello World<h1>`);
});

app.get("/contact", (req, res) => {
    res.send(`Phone number`);
});

app.get("/about", (req, res) => {
    res.send(`I am your mom`);
});

app.listen(port, () => {
    console.log(`Sever is running on port ${port}`);
});