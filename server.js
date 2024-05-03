const { json, urlencoded } = require('body-parser');
const express = require('express');
const app = express();
const userRouter = require('./router/userRouter');
const PORT = process.env.PORT || 5000;

app.use(json());
app.use(urlencoded({ extended:true }));


app.use('/users', userRouter);
app.listen(PORT)