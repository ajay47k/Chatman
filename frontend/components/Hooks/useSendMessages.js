import { useState } from "react"
import useConversation from "../../src/zustand/useConversation"
import toast from "react-hot-toast";
import axios from "axios";
const useSendMessage = () =>{
    const [loading,setLoading]= useState(false)
    const {messages,setMessages,selectedConversation}= useConversation()
    const sendMessage = async(message,reciever) =>{
        setLoading(true)
        // console.log(selectedConversation)
        try {
            console.log("here we useSend the messages")
			const res = await axios.post('http://localhost:3000/messages/sendMessages',{message,selectedConversation},{headers:{'Content-Type': 'application/json'},withCredentials : true})
			const data = res.data
            console.log(data)
			if (data.error){
				throw new Error(data.error)
			}
			setMessages([...messages,data])
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}

    }
    
    return { sendMessage, loading }

}
export default useSendMessage