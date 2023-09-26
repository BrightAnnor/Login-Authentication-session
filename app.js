const express = require('express');
const dotenv = require('dotenv');

//configuration
dotenv.config();

const dbConnect = require('./dbConnect')
const User = require('./user')

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
        // const {password} = req.body
        const result = User.create({first_name,last_name,email,password})
        console.log(result)
    } catch (error) {
        
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