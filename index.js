const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const { Server } = require('socket.io');
const http = require('http');

const userRoutes = require('./src/users/users.routes');
const anunciosRoutes = require('./src/anuncios/anuncios.routes');

const {connect} = require('./src/utils/database');
const db = connect();

const PORT = process.env.PORT;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

const app = express();
const server = http.createServer(app);
const socketIO = new Server(server, {
    cors: {
        origins: "*",
        methods: ["GET","POST", "PUT", "DELETE"],
        "preflightContinue": false,
        "optionsSuccessStatus": 204,   
    }
});
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use((req, res , next) => {
    res.header('Access-Control-Allow-Method', 'POST, GET, DELETE, PUT, PATCH');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Origin', '*');
    next();
})

app.use(cors({
    origin: "*",
    credentials: true
}))

let users = [];
socketIO.on('connection', (socket) => {
    let addedUser = false;

    console.log(`⚡: ${socket.id} user just connected!`);
    
    socket.on('disconnect', () => {
        users = users.filter((user)=> user.userID !== socket.userID);
        socket.emit('newUserResponse', users);
        console.log(socket.username, 'is disconnected');
    });

    socket.on('message', (data) => {
        // console.log( data);
        socket.emit('messageResponse', data);
        socket.broadcast.emit('messageResponse', data);
    });

    socket.on('newUser', (data) => {
        if (addedUser) return;
        //Adds the new user to the list of users
        addedUser = true;
        socket.username = data.userName;
        socket.userID = data.userID;
        users.push(data);
        console.log(data.userName, "is connected");
        //Sends the list of users to the client
        socket.emit('newUserResponse', users);
    });
});

app.use('/user', userRoutes);
app.use('/anuncios', anunciosRoutes);
app.get("/", (req, res) => {
    res.status(200).json({"message": "Bienvenida al Maleteo"});
})

app.use((error, req, res, next) => {
    return res.status(error.status || 500).json(`Error: ${error.message || "Unexpected error"} `);
})

server.listen(PORT, ()=> console.log(`listening on http://localhost:${PORT}`));