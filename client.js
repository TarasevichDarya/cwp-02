// client.js
const net = require('net');
const fs = require('fs');
const port = 8124;
const string = 'QA';
const bad = 'DEC';
const good = 'ACK';

const client = new net.Socket();
let currentIndex = -1;
client.setEncoding('utf8');

let questions = [];
client.connect({port: port, host: '127.0.0.1'}, () => {
    fs.readFile("qa.json", (err, text) => {
        if (!err) {
            questions = JSON.parse(text);
            client.write(string);
        }
        else console.error(err);
    });
});

