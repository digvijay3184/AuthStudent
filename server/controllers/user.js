const db = require('../database/db.js') ;

module.exports = {
    getStudents ,
    getAllUsers ,
    promoteUser ,
    deleteUser
}

function getStudents(req , res){
    const students = db.prepare(
        `SELECT id , username , role FROM users WHERE role = 'student'`
    ).all() ;
    console.log(students) ;
    res.json(students) ;
}
function getAllUsers(req , res){
    const users = db.prepare(
        `SELECT id , username , role FROM users`
    ).all() ;
    console.log(users) ;
    res.json(users) ;
}

function promoteUser(req , res){
    const userId = req.params.id ;
    const user = db.prepare(`SELECT * FROM users WHERE id = ?`).get(userId) ;
    if(!user){
        return res.status(404).json({message : 'User not found'}) ;
    }
    if(user.role === 'teacher'){
        return res.status(400).json({message : 'User is already a Teacher'}) ;
    }
    db.prepare(
        `UPDATE users SET role = 'teacher' WHERE id = ?`
    ).run(userId) ;
    res.json({message : 'User promoted to Teacher successfully'}) ;
}

function deleteUser(req , res){
    const userId = req.params.id ;
    const user = db.prepare(`SELECT * FROM users WHERE id = ?`).get(userId) ;
    if(!user){
        return res.status(404).json({message : 'User not found'}) ;
    }
    db.prepare(
        `DELETE FROM users WHERE id = ?`
    ).run(userId) ;
    res.json({message : 'User deleted successfully'}) ;
}