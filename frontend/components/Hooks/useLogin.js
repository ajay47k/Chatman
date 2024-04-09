import React from 'react'
import {useState} from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useAuthContext } from '../../context/AuthContextProvider'
import Cookies from 'js-cookie';
const useLogin =()=>{
        const [loading,setLoading]=useState(false)
        const {authUser,setAuthUser}=useAuthContext()
        const login = async ({
            username,
            password
        })=>{
            try{
                const success=handleInputErrors({
                    username,
                    password
                })
                
                if (!success) return 
                // console.log("Here")
                setLoading(true)
                const res = await axios.post('http://localhost:3000/user/login',{
                    username,
                    password
                },{headers:{'Content-Type': 'application/json'}, withCredentials : true})
                const data = res.data
                console.log(res._headers)
                // Throw error
                if (data.error){ 
                    throw new Error(data.error)
                }
                //local storage
                console.log(res)
                localStorage.setItem("chat-user",JSON.stringify(data))
                // Cookies.set('jwt', '', { expires: 7 })
                //context
                setAuthUser(data)
            }
            catch(err){
                console.log('error in login function of useLogin hook', err)
                toast.error(err.message);
            }
            finally{
                setLoading(false)
            }
        }
        return {loading, login}
}
const handleInputErrors = ({

    username,
    password
    })=>{
    console.log(password)
        
    if(!username || !password )
    {
        toast.error("One of the fields is empty")
        return false
    }
    // console.log("Here")
     if (password.length<6){
        toast.error("Length of the password is smaller than 6 characters")
        return false
     }

     return true
}
export default useLogin