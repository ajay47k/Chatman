const app = require('express')
const Router = app.Router()
const  {sendMessage,  getMessages} = require('./../controller/messageController')
const {protect}= require('./../config/AUTH')
Router.get('/getMessages/:id',protect,getMessages)
Router.post('/sendMessages',protect , sendMessage )

module.exports= Router

