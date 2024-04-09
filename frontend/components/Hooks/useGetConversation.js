import React from 'react'
import {useState,useEffect} from 'react'
import toast from 'react-hot-toast'
import axios from 'axios';
import { useAuthContext } from '../../context/AuthContextProvider';
function useGetConversation() {
    const [loading,setLoading] = useState(false)
    const [conversations,setConversations] = useState([])

    useEffect(()=>{
        const getConversations = async () =>{
            try{
                // console.log("Here is the useGetConversation")

                const res = await axios.get('http://localhost:3000/user/getUsers',{headers:{'Content-Type': 'application/json'},withCredentials : true})
                const data = res.data
                // console.log(data)
                if (data.error){throw new Error(data.error)}
                setConversations(data)
            } catch(err){
                toast.error(err.message)
            }
            finally{
                setLoading(false)
            }
        }
        getConversations()
    },[])
    return {loading, conversations}
}

export default useGetConversation