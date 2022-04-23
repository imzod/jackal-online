const express = require('express');
const ejsMate = require('ejs-mate');
const path = require("path");
const ExpressError = require("./utils/ExpressError");
const bodyParser = require("body-parser");
const {rando, randoSequence} = require('@nastyox/rando.js');
const http = require('http');

const app = express();
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);
const gameController = require("./controllers/gameController");


app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    gameController.startGame(req, res)
    res.render('game', {rando, io});
});

connections = [];
let field = null;

io.sockets.on('connection', function (socket) {
    console.log("Пользователь подключился");

    // Добавление нового соединения в массив
    connections.push(socket);

    // Функция, которая срабатывает при отключении от сервера
    socket.on('disconnect', function (data) {
        // Удаления пользователя из массива
        connections.splice(connections.indexOf(socket), 1);
        console.log("Пользователь отключился");
    });

    socket.on('typing', function (name) {
        io.emit('typing', name);
    })

    // Функция получающая сообщение от какого-либо пользователя
    socket.on('send mess', function (data) {
        // Внутри функции мы передаем событие 'add mess',
        // которое будет вызвано у всех пользователей и у них добавиться новое сообщение
        io.sockets.emit('add mess', {mess: data.mess, name: data.name, className: data.className});
    });
    socket.on('open cell', function (data) {
        io.sockets.emit('open cell', {index: data.index});
    });
    if (field === null) {
        field = gameController.startGame()
    }
    socket.emit('generate field', JSON.stringify(field.field));
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Serving on port ${port}`)
})