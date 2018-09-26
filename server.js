// server.js
const net = require('net'); // подключаем net
const fs = require('fs');   // подключаем fs
const port = 8124;          // константа содержащая порт 8124
const clientString = 'QA';
const answerofclient = 'ACK';
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
            writeLog('Client number ' + client.id + ' connected ');
            client.write(data === clientString ? answerofclient : disconclient);
        }
        else if (!err && data !== clientString) {
            writeLog('Client number ' + client.id + ' has asked: ' + data + ' ');
            let answer = generateAnswer();
            writeLog('Server answered to Client number ' + client.id + ': ' + answer + ' ');
            client.write(answer);
        }
    });
    client.on('end', () =>
    {
        logger.write('Client number '+ client.id + ' disconnected ');
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
server.listen(port, () => {
    console.log(`Server listening on localhost: ${port}`);
});