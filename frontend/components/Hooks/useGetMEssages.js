import React, { useState,useEffect } from 'react'
import useConversation from './../../src/zustand/useConversation'
import axios from 'axios'
import toast from "react-hot-toast";
const useGetMEssages = () => {
    const [loading,setLoading]= useState(false)
    const {messages,setMessages,selectedConversation}= useConversation()
    
    useEffect(()=>{
        const getMessages = async()=>{
            setLoading(true)
            try{
                // console.log("Here is the selected conversation for messages",selectedConversation)
                const res = await axios.get(`http://localhost:3000/messages/getMessages/${selectedConversation._id}`,{headers:{'Content-Type': 'application/json'}, withCredentials : true})
                // console.log("Messages loaded for the conversation")
                const data=res.data
                // console.log(data)
                if(data.error) {console.log("There is some error ");setMessages([]); throw new Error(data.error)}
                setMessages(data)
            } catch(err){
                toast.error(err.message);
            }finally{setLoading(false)}
        }
        if(selectedConversation?._id) {getMessages()}
    },[selectedConversation?._id,setMessages])
// console.log(message)
return {messages,loading}
}

export default useGetMEssages
