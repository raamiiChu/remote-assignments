// import express from "express";
const express = require("express");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Home Page");
});

app.get("/healthcheck", (req, res) => {
    res.send("OK");
});

app.get("*", (req, res) => {
    res.send("404 page not found");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
