const express = require('express')
const cookieParser= require('cookie-parser')
const dotenv = require('dotenv').config({path:"./.env"})
const cors = require("cors");
const mongoose = require('mongoose')
const connectDB = require('./config/DB')
const userRoute = require('./routes/userRoutes')
const messageRoute=require("./routes/messageRoutes")
const PORT = process.env.PORT || 5000
const {app,server}= require("./socket/socket")
// const app=express() recreated by wrapping with server
// Middleware to log each request to the console
// app.use((req, res, next) => {
//     console.log("Here");
//     next();
// });
app.use(cookieParser())

app.use( 
    cors({
      origin: 'http://localhost:5173',
      credentials: true
    })
  ) 

// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true  // Allows the server to receive credentials (cookies)
// }))
  app.use(express.json())
  app.use('/user',userRoute)  
  app.use('/messages',messageRoute)
  // Connect to DB
connectDB()
mongoose.connection.once('open',()=>{
    console.log("Connected to DB")
    server.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`)
    })
})
