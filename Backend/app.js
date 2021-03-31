const express = require('express') ;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require("path");


const postsRouter = require("./routes/posts")

const app = express();

app.use(bodyParser.json());

app.use('/api/post', postsRouter);

app.use("/images",express.static(path.join("backend/images")));

module.exports = app ;