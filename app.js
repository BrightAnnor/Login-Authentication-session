const express = require('express');
const dotenv = require('dotenv');

//configuration
dotenv.config();

//server port
const port = process.env.port

//creating server
const app = express();

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