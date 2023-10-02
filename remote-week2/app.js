// import express from "express";
const express = require("express");

const app = express();
const port = 3000;

// Home Page
app.get("/", (req, res) => {
    res.send("Home Page");
});

// Healthcheck API
app.get("/healthcheck", (req, res) => {
    res.send("OK");
});

// Routing for All
app.get("*", (req, res) => {
    res.send("404 page not found");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
