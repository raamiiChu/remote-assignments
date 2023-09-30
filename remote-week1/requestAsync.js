// import axios from "axios";
const axios = require("axios");

const url =
    "https://ec2-54-64-246-136.ap-northeast-1.compute.amazonaws.com/delay-clock";

function requestCallback(url, callback) {
    // write code to request url asynchronously
    console.time("Callback");

    axios
        .get(url)
        .then((res) => {
            callback(res.data);
        })
        .catch((error) => {
            callback(error);
        })
        .finally(() => {
            // print out the execution time
            console.timeEnd("Callback");
            callback("=".repeat(20));
        });
}

function requestPromise(url) {
    // write code to request url asynchronously with Promise
    console.time("Promise");

    return new Promise((resolve, reject) => {
        axios
            .get(url)
            .then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                reject(error);
            })
            .finally(() => {
                // print out the execution time
                console.timeEnd("Promise");
                console.log("=".repeat(20));
            });
    });
}

async function requestAsyncAwait(url) {
    // write code to request url asynchronously
    // you should call requestPromise here and get the result using async/await.
    console.time("AsyncAwait");

    try {
        let res = await axios.get(url);
        console.log(res.data);
    } catch (error) {
        console.log(error);
    }

    // print out the execution time
    console.timeEnd("AsyncAwait");
    console.log("=".repeat(20));
}

requestCallback(url, console.log); // would print out the execution time
requestPromise(url).then(console.log);
requestAsyncAwait(url);
