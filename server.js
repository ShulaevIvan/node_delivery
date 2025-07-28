const env = require('dotenv').config();
const PORT = env.parsed.PORT ? env.parsed.PORT : 3000;
const HOST = env.parsed.HOST ? env.parsed.HOST : 'localhost';
const path = require('path');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require("socket.io")(server);
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./passport/passport');
const database = require('./database/database');
const apiRouter = require('./routes/apiRouter');
const initSocket = require('./ws/socketHandler');
const createFolders = require('./utils/checkFolders');


const sessionMiddleware = session({
    secret: 'test123',
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 60 * 60 * 1000
    },
    resave: false,
    saveUninitialized: false
});


app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

server.listen(PORT, () => {
    console.log(`server started at: \n http://${HOST}:${PORT}`);
});
database();
createFolders();

io.engine.use(sessionMiddleware);
initSocket(io);