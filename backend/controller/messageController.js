const conversation = require('./../models/conversationModel')
const messages = require('./../models/messageModel')
const mongoose = require('mongoose')
const { getReceiverSocketId, io } = require("./../socket/socket.js") 
const getMessages = async (req,res)=>{
    try{
        // const sender = req.user._id
        // const {reciever} = req.body// Handle at frontend dont allow sending messages without reciver id 
        const sender = req.user._id.toString()
        const {id} = req.params// Handle at frontend dont allow sending messages without reciver id 
        // console.log(selectedConversation) Hai he nahi
        // let receiver = selectedConversation._id
        // console.log(id)
        // console.log("Here")
        const conversations= await conversation.findOne({
            participants: { $all: [sender, id] },
        }).populate(["messages"])  // .
        // console.log("Here")
        // console.log([sender,id])
        // console.log(conversations)
        if(!conversations) return res.status(401).json({msg:"Conversation does not exist So no messages"})
        res.status(201).json(conversations.messages)
    }
    catch(err){
        console.log("Error in getMessages controller: ", err.message);
        res.status(500).json('Internal Server Error')
    }
}
const sendMessage = async(req,res)=>{
try{
    console.log("Here")
    const sender = req.user._id.toString()
    // const {message} = req.body// Handle at frontend dont allow sending messages without reciver id 
    // let receiver = req.body.receiver
    const {message,selectedConversation} = req.body// Handle at frontend dont allow sending messages without reciver id 
    // console.log(selectedConversation)
    let receiver = selectedConversation._id
    // console.log(selectedConversation)  
    // console.log(sender) 
    // console.log(send)
    // receiver = new mongoose.Types.ObjectId(receiver);
    // console.log(sender)
    if(!message) return res.status().json({msg:"Cannot send empty messages"})
    let conversations= await conversation.findOne({
        participants: { $all: [sender, receiver] },
    })  // .
    // Create Messages
    const newMessage = new messages({
        senderId:sender,
        recieverId:receiver,
        message:message
    })
    // Checking whether the sender user is already in conversation with the reciever
    if(!conversations){
       conversations = await conversation.create({
            participants: [sender, receiver],
        }) 
    }
    // console.log(conversations)
    if(newMessage) conversations.messages.push(newMessage._id)
    await conversations.save()
    await newMessage.save()
    // Socket IO Functionality will go here
    const receiverSocketId = getReceiverSocketId(receiver)
    if(receiverSocketId){
        // Io.to will send the message to a  specific socket Id
        io.to(receiverSocketId).emit("newMessage",newMessage)
    }
    res.status(201).json(newMessage)
}
catch(err){
    console.log("Error in sendMessage controller: ", err.message);
    res.status(500).json('Internal Server Error')
}
}
module.exports ={
    getMessages,
    sendMessage
}