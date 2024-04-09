import { useAuthContext } from "./../../context/AuthContextProvider"
import { extractTime } from "./../../src/utils/extractTime"
import useConversation from "./../../src/zustand/useConversation"
import { CgProfile } from "react-icons/cg";

import back from "./../../src/assets/back.jpg"
const Message = ({ message }) => {
	const { authUser } = useAuthContext()
	const { selectedConversation } = useConversation()
	const fromMe = message.senderId === authUser._id
	const formattedTime = extractTime(message.createdAt)
	const chatClassName = fromMe ? "chat-end" : "chat-start"
	const profilePic = fromMe ? authUser.profilepic : selectedConversation?.profilepic
	const bubbleBgColor = fromMe ? "bg-blue-500" : ""
	const shakeClass = message.shouldShake ? "shake" : ""
	// console.log("Auth Ka user",authUser)
	// console.log("Selected conversation",selectedConversation)
		// console.log(authUser)
	// console.log(message)
	return (
		<div className={`chat ${chatClassName}`}>
        {/* // <div className={`chat chat-end`}> */}
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
				<img
						src={profilePic}
 						alt='Tailwind CSS that bubble component'
 						/>
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
            {/* <div className={`chat-bubble text-white bg-blue-500 shake pb-2`}>Hello I am here</div> */}
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
            {/* <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>9:45 AM</div> */}
		</div>
	);
};
export default Message;