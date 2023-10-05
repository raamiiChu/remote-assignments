require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

const mysql = require("mysql2/promise");

const app = express();
const port = 3000;

// Create the connection to database
async function connectToMysql(res) {
    try {
        const connection = await mysql.createConnection({
            host: process.env.APPWORK_RDS_HOST,
            port: process.env.APPWORK_RDS_PORT,
            user: process.env.APPWORK_RDS_USER,
            database: process.env.APPWORK_RDS_DATABASE,
            password: process.env.APPWORK_RDS_PASSWORD,
        });

        console.log("Connect to DB!");
        return connection;
    } catch (error) {
        console.log(error);
        return res.status(500).send("Can not connect to DB");
    }
}

// Data validation
function validName(name) {
    let regex = /^[a-zA-Z0-9]+$/;

    return regex.test(name);
}
function validateEmail(email) {
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    return regex.test(email);
}
function validatePassword(password) {
    let uppercaseRegex = /[A-Z]/;
    let lowercaseRegex = /[a-z]/;
    let numberRegex = /[0-9]/;
    let symbolRegex = /[~`!@#$%^&*()_\-+={[}\]|:;"'<,>.?/|]/;

    let count = 0;
    if (uppercaseRegex.test(password)) {
        count += 1;
    }
    if (lowercaseRegex.test(password)) {
        count += 1;
    }
    if (numberRegex.test(password)) {
        count += 1;
    }
    if (symbolRegex.test(password)) {
        count += 1;
    }

    // Check if at least three of the four character types are present
    return count >= 3;
}

// middleware
app.use(bodyParser.json());
app.use((req, res, next) => {
    req.headers["content-type"] = "application/json";

    req.headers["request-date"] = new Date().toISOString();

    next();
});

// Home Page
app.get("/", (req, res) => {
    res.status(200).send("Home Page");
});

// Healthcheck API
app.get("/healthcheck", (req, res) => {
    res.status(200).send("OK");
});

// User Query API
app.get("/users", async (req, res) => {
    // Create the connection to database
    const connection = await connectToMysql(res);

    let { id } = req.query;

    // Try to find user
    let [foundUser] = await connection.execute(
        `SELECT * from users WHERE id = ${id}`
    );

    // Did not find user
    if (foundUser.length === 0) {
        return res.status(403).send("User Not Existing");
    }

    // Get user's name & email
    let { name, email } = foundUser[0];

    // Send the results
    res.status(200).json({
        data: {
            user: { id, name, email },
            "request-date": req.headers["request-date"],
        },
    });
});

// User Sign Up API
app.post("/users", async (req, res) => {
    let { name, email, password } = req.body;

    // Data validation
    if (!validName(name)) {
        return res
            .status(400)
            .send("Name can only contains english alphabet and number");
    }
    if (!validateEmail(email)) {
        return res.status(400).send("Invalid email address");
    }
    if (!validatePassword(password)) {
        return res.status(400).send(
            `Password should contain at least three of the four character types: \n
                1. Uppercase letters: A-Z.
                2. Lowercase letters: a-z
                3. Numbers: 0-9
                4. Symbols: ~\`! @#$%^&*()_-+={[}]|:;"'<,>.?/|
                `
        );
    }

    // Create the connection to database
    const connection = await connectToMysql(res);

    // Try to find user
    let [foundUser] = await connection.execute(
        `SELECT * from users WHERE email = "${email}"`
    );

    // User found
    if (foundUser.length !== 0) {
        return res.status(409).send("Email Already Exists");
    }

    // Add a new user
    await connection.execute(
        `INSERT INTO users(name, email, password) VALUES("${name}", "${email}", "${password}")`
    );

    let [newUser] = await connection.execute(
        `SELECT * from users WHERE email = "${email}"`
    );

    // Get new user's id
    let { id } = newUser[0];

    // Send the results
    res.status(200).json({
        data: {
            user: { id, name, email },
            "request-date": req.headers["request-date"],
        },
    });
});

// Routing for All
app.get("*", (req, res) => {
    res.status(404).send("404 page not found");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
