const express = require("express");
// creating app using express
const app = express();

// required packages
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// app routes
const authRoute = require('./routes/auth');

// setup to read an env variable from a file
dotenv.config();

// Connect to the DB
mongoose.set('strictQuery', true); // to suppress the warning on terminal
mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () => {
    }
);


// Middleware
app.use(express.json());
// Using auth routes
app.use('/api/user', authRoute);

app.listen(3000, () => console.log('Server is running!'))