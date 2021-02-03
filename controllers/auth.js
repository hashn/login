//import mysql
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//connecting mysql
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.login = async(req,res) =>{
    try{
        const {email,password } = req.body;

        if( !email || !password){
            return res.status(400).render('login',{
                message:'Please provide Email and Password'
            })
        }
    }catch(error){
        console.log(error);
    }
}

exports.register = (req,res) =>{
    console.log(req.body);

    const{name , email ,  password , passwordConfirm } =req.body;
    //?allow only one user to register
    db.query('SELECT email FROM users WHERE email = ?', [email], async(error,results) =>{
        if(error){
            console.log(error);
        }
        if(results.length > 0){
            return res.render('register', {
                message: 'That email is already in use'
            });
        }else if(password !== passwordConfirm){
            return res.render('register', {
                message: 'That email is already in use'
            });
        }

        let hashedPassword = await bcrypt.hash(password,8);
        console.log(hashedPassword);

        db.query('INSERT INTO users SET ?', {name:name, email:email, password:hashedPassword},(error,results)=>{
            if(error){
                console.log(error);
            }else{
                return res.render('register',{
                    message: 'User registered'
                });
            }
        });


    });
    
}
