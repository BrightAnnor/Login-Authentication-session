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
        const {first_name,last_name,email,password} = req.body
        const result = await User.create({first_name,last_name,email,password})
        res.send(result)
    } catch (error) {
        console.log(error)
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