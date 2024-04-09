import MessageInput from "./MessageInput";
import Messages from "./Messages";
import {TiMessages} from "react-icons/ti"
import { useEffect } from "react";
import useConversation from "./../../src/zustand/useConversation";
import {useAuthContext} from "./../../context/AuthContextProvider"
const MessageContainer = () => {
	// const noChatSelected = true replacing the hardcoded with values wwe have from the global state
	const {selectedConversation,setSelectedConversation} = useConversation()
	useEffect(() => {
		// cleanup function (unmounts)
		return () => setSelectedConversation(null);
	}, [setSelectedConversation])
	//  console.log(`Here is the selected conversation in main container ${selectedConversation}`)
	return (
		<div className='md:min-w-[450px] flex flex-col'>
			{!selectedConversation?(<NoChatSelected/>):(
				<>
				{/* {selectedConversation.fullname} */}
				{/* Header */}
				<div className='bg-slate-500 px-4 py-2 mb-2'>
					<span className='label-text'>To:</span> <span className='text-gray-900 font-bold'>{selectedConversation.fullname}</span> 
				</div>
				<Messages />
				<MessageInput />
			</>)}
		</div>
	)
}
export default MessageContainer
const NoChatSelected = ()=>{
	const{authUser} = useAuthContext()
	console.log(authUser)
	return(
		<div className="flex items-center justify-center w-full h-full">
			<div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
				<p>Welcome 👏 {authUser.fullname}</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className="text-3xl md:text-6xl text-center"/>
			</div>

		</div>
	)
}