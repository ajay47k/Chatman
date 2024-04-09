import { useSocketContext } from "./../../context/SocketContext";
import useConversation from "../../src/zustand/useConversation";
const Conversation = ({conversations,lastIdx,emoji}) => {
	const {selectedConversation,setSelectedConversation} = useConversation()
	const {onlineUsers}= useSocketContext()
	const isOnline = onlineUsers.includes(conversations._id)
	// console.log(isOnline, conversations)
	let isSelected= false
	// console.log(selectedConversation)
	if (selectedConversation){
		isSelected  = selectedConversation._id === conversations._id? true:false
	}
	// console.log(`here the ${selectedConversation} `)
	const handleSelection =()=>{
		setSelectedConversation(conversations)
		// console.log(selectedConversation)
	}
	return (
		<>
<div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${isSelected ? 'bg-sky-500' : ''}`} 
onClick={handleSelection}>
  <div className={`avatar ${isOnline?"online":""}`}>
    <div className='w-12 rounded-full'>
      <img
        src={conversations.profilepic}
        alt='user avatar'
      />
    </div>
  </div>
  <div className='flex flex-col flex-1'>
    <div className='flex gap-3 justify-between'>
      <p className='font-bold text-gray-200'>{conversations.fullname}</p>
      <span className='text-xl'>{emoji}</span>
    </div>
  </div>
</div>
{!lastIdx && <div className='divider my-0 py-0 h-1' />}

		</>
	);
};
export default Conversation