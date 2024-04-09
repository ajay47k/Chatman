import {useSocketContext} from './../../context/SocketContext'
import { useEffect } from 'react'
import useConversation from './../../src/zustand/useConversation'
import notification from "./../../src/assets/sounds/notification.mp3"
const useListenMessages = () => {
    const {socket}=useSocketContext()
    const {messages,setMessages} = useConversation()
    useEffect(()=>{
        socket.on('newMessage',(newMessage)=>{
            newMessage.shouldShake= true
            const sound = new Audio(notification)
            sound.play()
            setMessages([...messages, newMessage])
        })
        // This line is very important to unmount the connection
        return()=> socket?.off("newMessage")
    },[socket,setMessages,messages])
  
}

export default useListenMessages