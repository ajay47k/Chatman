const mongoose = require('mongoose')

const messageModel= mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId, 
        required : true,
        ref:'User'
    },
    recieverId:{
        type: mongoose.Schema.Types.ObjectId, 
        required : true,
        ref:'User'
    },
    message:{
        type:String,
        default:"",
        required:true
    }
},{timestamps:true})
const Message= mongoose.model('Message',messageModel)
module.exports=Message