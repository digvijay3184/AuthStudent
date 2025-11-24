const express = require('express') ;
const router = express.Router();

const auth = require('../middleware/auth.js') ;

const {
    getStudents ,
    getAllUsers ,
    promoteUser,
    deleteUser ,
} = require('../controllers/user.js') ;

//Students List (Student and Teacher Access)
router.get('/students', getStudents) ;

//Teacher Only Routes
router.get('/',auth , teacherOnly , getAllUsers) ;
router.put('/promote/:id',auth , teacherOnly , promoteUser) ;
router.delete('/:id',auth , teacherOnly , deleteUser) ;

//For checking that if role is Teacher (Acting as middleware)

function teacherOnly(req , res , next){
    if(req.user.role !== 'Teacher'){
        return res.status(403).json({message : 'Access denied. Teachers only.'}) ;
    }
    next();
}


module.exports = router ;
