//Import express
const express = require('express');
//database
const mysql = require('mysql');
//env
const dotenv = require('dotenv');
//path
const path = require('path');

const cookieParser = require('cookie-parser');

dotenv.config({ path: './.env'});


//start the server
const app = express();

//connecting mysql
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});
//__dirname, actual path name
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

//Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false}));

//parse JSON bodies(As sent by API clients)
app.use(express.json()); 
app.use(cookieParser());



app.set('view engine','hbs');

//connecting db
db.connect( (error)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log("Mysql Connected..");
    }
})

//define routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));


//port console log
app.listen(5002,() =>{
    console.log("Server started at port 5002");
}) 