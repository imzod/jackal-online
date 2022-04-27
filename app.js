const express = require('express');
const ejsMate = require('ejs-mate');
const path = require("path");
const ExpressError = require("./utils/ExpressError");
const bodyParser = require("body-parser");
const {rando} = require('@nastyox/rando.js');
const http = require('http');


const flash = require('express-flash');
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
        cookie: {maxAge: 30 * 24 * 60 * 60 * 1000}
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

app.get('/', authHelpers.loginRequired, (req, res) => {
    gameController.startGame(req, res)
    res.render('game', {rando, io});
});

app.use('/', authRouter);




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