import { createContext, useState,useEffect, useContext } from "react"
import { io } from "socket.io-client"
const SocketContext= createContext()
import { useAuthContext } from "./AuthContextProvider"
export const useSocketContext = () => {
    return useContext(SocketContext)
}
export const SocketContextProvider =({children})=>{
    const [socket,setSocket]= useState(null)
    const [onlineUsers,setOnlineUsers]=useState([])
    const{authUser} = useAuthContext()
    useEffect(()=>{
        if(authUser){
            // const socket = io("http://localhost:3000",
            // query:{
            //     userId:authUser._id
            // }) 
            const socket = io("http://localhost:3000", {
                query: {
                    userId: authUser._id
                }
            })
            setSocket(socket)
            // will listen for the "getOnline users"
            socket.on("getOnlineUsers",(users)=>{setOnlineUsers(users)})
            return ()=> socket.close()
        }else{
            if(socket){
                socket.close()
                setSocket(null)
            }
        }
    },[authUser])
    return(
        <SocketContext.Provider value={{socket,onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
} 