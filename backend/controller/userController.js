const bcrypt = require( 'bcrypt' )
const User =require('./../models/userModel')
const mongoose = require('mongoose')
const generateTokenAndSetCookie = require('./../config/JWT')

const loginController= async(req,res)=>{
    try{  
        console.log("Here") 
        // await bcrypt.compare(plainPassword, hashedPassword)// returns true or false
        const {username,password}= req.body 
        // let user=await User.findOne({username:username}).select('-password')
        let user=await User.findOne({username:username})
        // console.log(user)
     //    Check if user exist
     if(!user){ 
         return res.status(400).json({error:"User Does not exist"})   
     }
     //Check Password
     const isPasswordValid = await bcrypt.compare(password,user.password)
     if(!isPasswordValid){
         return res.status(401)
               .json({ message: ' Invalid Credentials.'+
                          'Please enter a valid username and password' })
     }
    //  console.log("Here")
    //  Create Token
    generateTokenAndSetCookie(user._id,res)
    res.status(200).json({
        _id: user._id,
        fullname: user.fullname,
        username: user.username,
        profilepic: user.profilepic,
    })
    // console.log(res._header)
    // res.status(200).json(user)  
    }
    catch(err){ 
        console.log("Error in loginController")
        res.status(500).json({message: "Server error"})
        throw err
    }
}
const  registerController =async(req,res)=>{
    try{
        const {fullname,username,password,email,gender}= req.body;
        // Apply the confirm password functionality at the front end
        // check if user already exists or not
        // console.log("Here")
        // console.log("Here") 
        let user = await User.findOne({username: username});
        if (user){
           return res.status(400).json({msg:"User Already Exists!"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashpasword=await bcrypt.hash(password,salt)
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        // create the document
        const newuser = new User({
            fullname : fullname ,
            username : username ,
            password :hashpasword,
            email:email,
            gender:gender,
            profilepic:gender==='male' ? boyProfilePic : girlProfilePic
          })
          
        if(newuser){
            generateTokenAndSetCookie(newuser._id,res)
            await newuser.save()
            res.status(201).json({
                fullname : fullname ,
                username : username ,
                email:email,
                gender:gender,
            })
        }else{
            res.status(400).json({msg:"Invalid user Data"})
        }
    }
    catch(err){
        console.log("Error in registerController")
        res.status(500).json({message: "Server error"})
        throw err
    }
    // res.status(200).send('OK')
}
const logoutController = async(req,res)=>{
    try{
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
}
    catch(err){
        console.log("Error in logoutController")
        res.status(500).json({message: "Server error"})
        throw err
    }
}
const getUsersController = async (req,res)=>{
    try{
        const user = req.user
        // console.log("user")
        const users = await User.find({ _id: { $ne: user._id } }).select("-password")
        // 
        // console.log(users)
        res.status(201).json(users)
    }
    catch(err){
        console.log("Error in getUsersController")
        res.status(500).json({message: "Server error"})
        throw err
    }
}
module.exports = {
    loginController,
    registerController, 
    logoutController,
    getUsersController
}