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
        else if (!err && data === clientString)
        {
            client.id = Date.now() + seed++;
            writeLog('Client #' + client.id + ' connected\n');
            client.write(data === clientString ? conclient : disconclient);
        }
        else if (!err && data !== clientString) {
            writeLog('Client #' + client.id + ' has asked: ' + data + '\n');
            let answer = generateAnswer();
            writeLog('Server answered to Client #' + client.id + ': ' + answer + '\n');
            client.write(answer);
        }
    });
    client.on('end', () =>
    {
        logger.write('Client #'+ client.id+ ' disconnected');
        console.log('Client disconnected')
    });
});
function writeLog(data)
{
    logger.write(data);
}
function generateAnswer()
{
    return Math.random() > 0.5 ? '1' : '0';
}
