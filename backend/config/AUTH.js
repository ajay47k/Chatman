const jwt =require('jsonwebtoken')
const User = require("./../models/userModel")
const protect = async (req,res,next)=>{
    try{ 
        const token = req.cookies.jwt
        // console.log(req)
        // console.log(req) 
        // console.log(Object.keys(req))
        // token = req.headers.authorization.split(' ')[1]
        // console.log(token)
        // console.log("Hunting for conversataions")
        if(!token) return res.status(401).send({msg:"Unauth no token"})
        // console.log("Here")
        const decoded= jwt.verify(token,process.env.JWT)
        if(!decoded)return res.status(401).send({msg:'Unauth not authorisation'})
        // console.log("Here")
        const user = await User.findOne({_id:decoded.userId}).select('-password') //hide password field from response
        // console.log("Here")
        if (!user) return res.status(401).send({msg:"User not Found!!"}) 
        // console.log("Here") 
        // console.log(user)
        req.user = user
    
    next()
    }
    catch(err){
        res.status(500).json({msg: 'Internal Server Error'})
    }
}
module.exports={protect}