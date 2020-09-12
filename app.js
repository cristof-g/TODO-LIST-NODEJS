const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv   = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();

//Coneccion DB
mongoose.connect(process.env.DATABASE)
    .then(db => console.log('DB connected'))
    .catch(err => console.log(err));

//importing routes
const indexRoutes = require('./routes/index');

//settings
app.set('port', process.env.PORT);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true})); //Entender datos que se envian en un formulario
app.use(express.static(__dirname + '/public'));

//routes
app.use('/', indexRoutes);


//starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});