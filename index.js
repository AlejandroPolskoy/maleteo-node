const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const cloudinary = require('cloudinary').v2;

const userRoutes = require('./src/users/users.routes');
const anunciosRoutes = require('./src/anuncios/anuncios.routes');

// const {connect} = require('./src/utils/database');
// const db = connect();

const PORT = process.env.PORT;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})
const app = express();

app.use((req, res , next) => {
    res.header('Access-Control-Allow-Method', 'POST, GET, DELETE, PUT, PATCH');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Origin', '*');
    next();
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/user', userRoutes);
app.use('/anuncios', anunciosRoutes);
app.get("/", (req, res) => {
    res.status(200).json({"message": "Bienvenida al Maleteo"});
})

app.use((error, req, res, next) => {
    return res.status(error.status || 500).json(`Error: ${error.message || "Unexpected error"} `);
})

app.use(cors({
    origin: "*",
    credentials: true
}))

app.listen(PORT, ()=> console.log(`listening on http://localhost:${PORT}`));