import useGetConversation from "../Hooks/useGetConversation";
import useGetMEssages from "./../Hooks/useGetMEssages";
import Message from "./Message";
import useConversation from "../../src/zustand/useConversation"
import MessageSkeleton from "../skeletons/MessageSkeleton";
import { useRef, useEffect } from "react";
import useListenMessages from "./../Hooks/useListenMessages";
const Messages = () => {
	const {messages,loading}= useGetMEssages()
	useListenMessages()
    // const {message,setMessages,selectedConversation}= useConversation()
	// console.log(messages)
	const lastMessageRef = useRef()
	// Scrolls down to the latest message
	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 300);// to allow for loading of new messages of the new chat as it takes time to get response from backend
	}, [messages]);

	// console.log(messages)
	return (
		<div className='px-4 flex-1 overflow-auto'>
		{!loading && messages.length >0
		 && messages.map((message)=>(
			<div key={message._id} ref={lastMessageRef}>
				<Message key={message._id} message={message}/>
			</div>
		 ))}
         {loading && [...Array(3)].map((_,idx)=><MessageSkeleton key={idx}/>)}
		 {!loading && messages.length===0 && (<p className="text-center">Send Message to start the conversation</p>)}
		</div>
	);
};
export default Messages;