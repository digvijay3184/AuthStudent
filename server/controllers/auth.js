const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database/db.js');

const register = (req, res)=>{
    const {username, password, role} = req.body ;

    if(!username || !password){
        return res.status(400).json({message: "Username and password are required"}) ;
    }
    
    const exists = db.prepare(`SELECT * FROM users WHERE username = ?`).get(username) ;
    if(exists){
        return res.status(409).json({message: "Username already exists , Please choose another one"}) ;
    }

    try{
        const hashedPassword = bcrypt.hashSync(password, 10) ;
        const result = db.prepare(
            `INSERT INTO users (username, password, role) VALUES (?, ?, ?)`
        ).run(username , hashedPassword , role || 'student') ;
        console.log(result) ;
        return res.status(201).json({message:'User registered successfully'}) ;
    }catch(err){
        console.log(err) ;
        return res.status(500).json({message: "Server Issue . Please Try Again Later"}) ;
    }
}

const login = (req, res)=>{
    const {username, password} = req.body ;
    if(!username || !password){
        return res.status(400).json({message: "Username and password are required"}) ;
    }
    const user = db.prepare(`SELECT * FROM users WHERE username = ?`).get(username) ;
    if(!user){
        return res.status(401).json({message: "Invalid Credentials"}) ;
    }

    try{
        const passwordMatch = bcrypt.compareSync(password , user.password) ;
        if(!passwordMatch){
            return res.status(401).json({message: 'Invalid Credentials'}) ;
        }
        const payload = {id: user.id , username: user.username , role: user.role} ;
        const token = jwt.sign(
            payload ,
            process.env.JWT_SECRET ,
            {expiresIn: '2h'}
        ) ;
        console.log(payload);
        console.log(token) ;
        return res.status(200).json({token , user: payload}) ;
    }catch(err){
        console.log(err) ;
        return res.status(500).json({message: "Server Issue . Please Try Again Later"}) ;
    }
}

module.exports = {
    register ,
    login
} ;