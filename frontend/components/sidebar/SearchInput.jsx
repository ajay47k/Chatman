import { useState } from "react"
import { IoSearchSharp } from "react-icons/io5"
import toast from 'react-hot-toast'
import useConversation from "../../src/zustand/useConversation"
import useGetConversation from "./../Hooks/useGetConversation"
const SearchInput = () => {
	const [search,setSearch]= useState("")
	const {setSelectedConversation}= useConversation()
	const {conversations}= useGetConversation()
	const handleSubmit = (e) => {
		e.preventDefault()
		if (!search) return
		if (search.length < 3) {
			return toast.error("Search term must be at least 3 characters long")
		}

		const conversation = conversations.find((c) => c.fullname.toLowerCase().includes(search.toLowerCase()))

		if (conversation) {
			setSelectedConversation(conversation)
			setSearch("")
		} else toast.error("No such user found!")
	}
	return (
		<>
		<form className="flex items-center gap-2" onSubmit={handleSubmit}>
			<input type="text" placeholder="Search....." className="input input-bordered rounded-full" value={search} onChange={(e)=>setSearch(e.target.value)}/>
			<button type="submit" className="btn btn-circle bg-sky-500 text-white" style={{backgroundColor:"#054c68", color: "#fff",opacity: "0.3",borderRadius:"50%"}}>
				<IoSearchSharp className="w-6 h-6 outline-none" style={{text:"white",opacity:"1"}}/>
			</button>
		</form>

		</>
	)
}
export default SearchInput;