const express = require('express');
const dotenv = require('dotenv');

//configuration
dotenv.config();

const dbConnect = require('./dbConnect');
const User = require('./user');
const bcrypt = require('bcrypt');
const expressSession = require('express-session');

//server port
const port = process.env.port
const API_SECRET = process.env.API_SECRET

//creating server
const app = express();
//setting session to keep track of user
app.use(expressSession({
    secret:API_SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{}
}))

app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.send('hello')
})


//creating account
app.post('/register',async(req,res)=>{

    try {
        const {first_name,last_name,email,password} = req.body

        // hashing password
        const hashPassword = await bcrypt.hash(password,10)
        const result = await User.create({first_name,last_name,email,'password':hashPassword})
        
        if(result)
        return res.send('Account created Successfully')

        res.send('Unable to Create Account')
    } catch (error) {
        res.send('Unable to Handle Request currently, try again');
    }   

});

//  login into an account
app.post('/login',async (req,res)=>{
    try {
        const {email,password} = req.body
        // determine if there is such a user in the database
        const result = await User.findOne({where:{email}}) 
        if(!result) return res.send('Invalid Credentials, try again')
        
        const userCorrectPassword = result.password
        //compare hashed password with the curerent password
        const isPasswordCorrect = await bcrypt.compare(password,userCorrectPassword)
        
        if(!isPasswordCorrect)
         return res.send('Invalid Credentials,try again')

         res.send('Login Successfully');

    } catch (error) {
        console.log(error)
    }
});



//User Home Page
app.get('/home-page',(req,res)=>{
    try {
        
    } catch (error) {
        res.send('Unable to Handle Request')
    }
})

const startServer = ()=>{
    try {
        app.listen(port,()=>{
            console.log(`server runing on http://localhost:${port}`)
            dbConnect.authenticate()
        })
    } catch (e) {
        console.log(e)
        
    }
}
startServer()