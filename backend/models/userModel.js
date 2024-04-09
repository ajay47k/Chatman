const mongoose = require('mongoose')
const user = mongoose.Schema(
    {
        fullname: {
          type: String,
          requried: true,
        },
        username: {
            type: String,
            requried: true,
            unique:true
          },
        password:{
            type :String ,
            required : true,
            minlength:8
        },
        email: {
          type: String,
          requried: true,
          unique:true
        },
        gender:{
            type:String,
            required:true,
            enum:['male','female']  // male
        },
        profilepic:{
            type:String,
            default:""
        }
      },
      {
        timestamps: true,
      }
)
const User = mongoose.model("User", user);
module.exports = User;