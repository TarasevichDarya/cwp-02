// server.js
const net = require('net'); // подключаем net
const fs = require('fs');   // подключаем fs
const port = 8124;          // константа содержащая порт 8124
const clientString = 'QA';
const conclient = 'ACK';
const disconclient = 'DEC';
const logger = fs.createWriteStream('client_id.log');   // создание файла log
let seed = 0;      // инициализируем сид

const server = net.createServer((client) => {   // создаем сервер
    console.log('Client connected');
    client.setEncoding('utf8');

    client.on('data', (data, err) =>
    {
        if (err) console.error(err);
        
    });
    client.on('end', () =>
    {
        logger.write('Client #'+ client.id+ ' disconnected');
        console.log('Client disconnected')
    });
});
