import Conversation from "./Conversation";
import useGetConversation from "../Hooks/useGetConversation";
import { getRandomEmoji } from "./../../src/utils/emojis";
const Conversations = () => {
	const {loading,conversations}=useGetConversation()
	// conversations= 
	// console.log("CONVERSATIONS",conversations)
	// const fgh =[conversation]
	// console.log(conversations)
	return (
		<div className=''>
			{conversations.map((conversations,idx)=>(<Conversation key={conversations._id} conversations={conversations} emoji={getRandomEmoji()} lastIdx={idx==conversations.length-1}  />))}
			{loading? <span className="loading loading-spinner mx-auto"/>:null}
		</div>
	);
};
export default Conversations;