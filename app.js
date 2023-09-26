const express = require('express');
const dotenv = require('dotenv');

//configuration
dotenv.config();

//server port
const port = process.env.port


//creating server
const app = express();

app.get('/',(req,res)=>{
    res.send('hello')
})

//creating account
app.post('/register',(req,res)=>{

})

const startServer = ()=>{
    try {
        app.listen(port,()=>{
            console.log(`server runing on http://localhost:${port}`)
        })
    } catch (e) {
        console.log(e)
        
    }
}
startServer()