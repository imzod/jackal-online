const express = require('express');
const ejsMate = require('ejs-mate');
const path = require("path");
const ExpressError = require("./utils/ExpressError");
const bodyParser = require("body-parser");
const {rando} = require('@nastyox/rando.js');
const http = require('http');


const flash = require('connect-flash');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);


const jwt = require("jsonwebtoken")
const SECRET = "passw0rd"

const {development} = require("./knexfile")
const knex = require("knex")(development)


const app = express();
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);
const gameController = require("./controllers/gameController");

const authRouter = require('./routes/auth');
const passport = require("passport");
const authHelpers = require("./controllers/authHelpers");


const store = new KnexSessionStore({
    knex,
    tablename: 'sessions', // optional. Defaults to 'sessions'
});

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))


app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
        secret: 'keyboard cat',
        saveUninitialized: true,
        resave: false,
        store,
        cookie: {
            httpOnly: true,
            expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
            maxAge: 1000 * 60 * 60 * 24 * 7
        }
    })
)
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {

    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})


/*
app.use('/', (req, res) => {
    const n = req.session.views || 0;
    req.session.views = n + 1;
    res.end(`${n} views`);
});*/


app.use('/', authRouter);

app.get('/', authHelpers.loginRequired, (req, res) => {

    gameController.startGame(req, res)
    res.render('game', {rando, io, user: req.user})
});


connections = [];
games = {game: []};
let game = null;



io.sockets.on('connection', function (socket) {
    if (games.game.length === 2) {
        socket.disconnect()
        return
    }
    socket.join('game')
    games.game.push(socket);

    socket.on('new user', function (data) {
        socket.to("game").emit('user connected', data);
        socket.username = data;
        console.log("Пользователь подключился", socket.username);
    })

    socket.on("disconnecting", () => {
        socket.to("game").emit('user disconnected', socket.username);
        games.game.splice(games.game.indexOf(socket), 1);
    });


    //console.log("Пользователь подключился", socket.username);

    // Добавление нового соединения в массив
    connections.push(socket);
    console.log(connections.length)
    // Функция, которая срабатывает при отключении от сервера
    socket.on('disconnect', function (data) {
        // Удаления пользователя из массива
        connections.splice(connections.indexOf(socket), 1);
        console.log("Пользователь отключился", socket.username);
    });

    socket.on('typing', function (name) {
        socket.to("game").emit('typing', name);
    })

    // Функция получающая сообщение от какого-либо пользователя
    socket.on('send mess', function (data) {
        // Внутри функции мы передаем событие 'add mess',
        // которое будет вызвано у всех пользователей и у них добавиться новое сообщение
        io.sockets.to("game").emit('add mess', {mess: data.mess, name: data.name, className: data.className});
    });
    socket.on('open cell', function (data) {
        io.sockets.to("game").emit('open cell', {index: data.index});
    });
    if (game === null) {
        game = gameController.startGame()
    }
    socket.emit('generate field', JSON.stringify(game.field));
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Serving on port ${port}`)
})