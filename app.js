const express = require('express');
const dotenv = require('dotenv');

//configuration
dotenv.config();

const dbConnect = require('./dbConnect')
const User = require('./user')
const bcrypt = require('bcrypt');

//server port
const port = process.env.port


//creating server
const app = express();

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