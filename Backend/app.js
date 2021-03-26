const express = require('express') ;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const postsRouter = require("./routes/posts")

const app = express();

app.use(bodyParser.json());



app.use('/api/post', postsRouter);

module.exports = app ;