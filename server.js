const express = require('express') ;
var backend = require('./Backend/app');
const { mongoose } = require('./Backend/database') ;
const cors = require('cors');


const app = express();
app.listen(3000, () => console.log('Server started at port : 3000'));
app.use(cors({ origin: 'http://localhost:4200'}));

app.use('', backend) ;
