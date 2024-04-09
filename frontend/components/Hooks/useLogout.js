import { useState } from "react";
import { useAuthContext } from "./../../context/AuthContextProvider";
import toast from "react-hot-toast";
import axios from 'axios'
const useLogout = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const logout = async () => {
		// console.log("Here")
		setLoading(true)
		try {
			const res = await axios.post('http://localhost:3000/user/logout',{headers:{'Content-Type': 'application/json'}})
			const data = res.data
			if (data.error){
				throw new Error(data.error)
			}
			localStorage.removeItem("chat-user");
			setAuthUser(null);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, logout };
};
export default useLogout;