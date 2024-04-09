import React from 'react'
import {useState} from 'react'
import toast from 'react-hot-toast'
import axios from 'axios';
import { useAuthContext } from '../../context/AuthContextProvider';
const useSignUp =()=>{
        const [loading,setLoading]=useState(false)
        const {authUser,setAuthUser}=useAuthContext()
        const signup = async ({
            fullname,
            username,
            password,
            confirmpassword,
            email,
            gender
        })=>{
            try{
                
                const success=handleInputErrors({
                    fullname,
                    username,
                    password,
                    confirmpassword,
                    email,
                    gender
                })
                if (!success) return 
                setLoading(true)
                const res = await axios.post('http://localhost:3000/user/register',{
                    fullname,
                    username,
                    password,
                    email,
                    gender
                },{headers:{'Content-Type': 'application/json'}})
                const data = res.data
                //local storage
                localStorage.setItem("chat-user",JSON.stringify(data))
                //context
                setAuthUser(data)

                
            }
            catch(err){
                console.log('error in signup function of usesignup hook', err)
                toast.error(err.message);
            }
            finally{
                setLoading(false)
            }
        }
        return [loading, signup]
}
const handleInputErrors = ({
    fullname,
    username,
    password,
    confirmpassword,
    email,
    gender
})=>{
    // console.log(password)
        
    if(!fullname || !username || !password || !confirmpassword || !email || !gender )
    {
        toast.error("One of the fields is empty")
        return false
    }
    console.log("Here")
     if (password.length<6){
        toast.error("Length of the password is smaller than 6 characters")
        return false
     }
     if (password!=confirmpassword){
        toast.error("Password and confirmation password are not the same")
        return false
     }
     return true

}
export default useSignUp