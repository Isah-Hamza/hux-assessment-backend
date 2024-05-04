const { json, urlencoded } = require('body-parser');
const express = require('express');
const app = express();
const userRouter = require('./router/userRouter');
const authRouter = require('./router/authRouter');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');

// middlewares
app.use(cors());
app.use(json());
app.use(urlencoded({ extended:true }));

// routes
app.use('/users', userRouter);
app.use('/', authRouter);


// db connection

// mongoose.connect('mongodb://localhost/test_db');
// mongoose.set("strictQuery", true);
// const db = mongoose.connection;
// db.on("error", (error) => console.error(error));
// db.once("open", () => console.log("Database connected"));

app.listen(PORT)