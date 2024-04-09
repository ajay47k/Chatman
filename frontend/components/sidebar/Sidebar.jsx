import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
// 	return (
// <div style={{ borderRight: '1px solid #657786', padding: '1rem', display: 'flex', flexDirection: 'column' }}>
// 	<div className="border-r border-slate-500 p-4 flex flex-col">
//     <SearchInput />
//     <div style={{ borderBottom: '1px solid #657786', paddingLeft: '0.75rem', margin:"2px" }}></div>
// 			<Conversations />
// 			<LogoutButton />
// 		</div>
// 	);
	return (

	<div className="border-r border-slate-500 p-4 flex flex-col">
    <SearchInput />
    <div className="divider px-3"></div>
			<Conversations />
			<LogoutButton />
		</div>
	);
};
export default Sidebar;