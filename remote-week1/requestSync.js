const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const url =
    "https://ec2-54-64-246-136.ap-northeast-1.compute.amazonaws.com/delay-clock";

function requestSync(url) {
    // write code to request url synchronously
    console.time("execution");

    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send();
    console.log(xhr.responseText);

    // print out the execution time
    console.timeEnd("execution");
    console.log("=".repeat(20));
}

requestSync(url); // would print out the execution time
requestSync(url);
requestSync(url);
