const express = require('express');
const ejsMate = require('ejs-mate');
const path = require("path");
const ExpressError = require("./utils/ExpressError");
const bodyParser = require("body-parser");
const {rando, randoSequence} = require('@nastyox/rando.js');
const http = require('http');

const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);




app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('game', {rando, io});
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

});


app.all('*', (req, res, next) => {
    next(new ExpressError('Page not found', 404))
});

/*app.use((err, req, res, next) => {
    const {statusCode = 500} = err;
    if (!err.message) err.message = 'Oh no, ERROR!!';
    res.status(statusCode).render('error', {err});
})*/

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Serving on port ${port}`)
})