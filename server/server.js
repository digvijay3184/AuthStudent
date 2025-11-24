require('dotenv').config();
const express = require('express') ;
const db = require('./database/db.js') ;
const cors = require('cors') ;

const app = express();
const authRoutes = require('./routes/auth.js') ;
const userRoutes = require('./routes/user.js') ;

app.use(cors()) ;
app.use(express.json()) ;
app.use('/api/auth', authRoutes) ;
app.use('/api/user', userRoutes) ;

const PORT = process.env.PORT || 5000 ;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`) ;
})

