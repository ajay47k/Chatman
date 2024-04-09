import { useState } from 'react'
import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp'
import { Route, Routes } from "react-router-dom"
import Home from './pages/home/Home'
import { useAuthContext } from '../context/AuthContextProvider'
import { useNavigate,Navigate } from 'react-router-dom'
useAuthContext
function App() {
  const navigate = useNavigate()
  const [count, setCount] = useState(0)
  const {authUser, setAuthUser} = useAuthContext()
  return (
		<div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        <Route path="/" element={authUser?<Home />:<Navigate to="/login" />} />
        <Route path="/login" element={authUser?<Navigate to="/" />:<Login />} />
        <Route path="/signup" element={authUser?<Navigate to="/" />:<SignUp />} />
        <Route path="/" element={authUser?<Navigate to="/" />:<SignUp />} />
        <Route path="*" element={authUser?<Home />:<Navigate to="/login" />} />
      </Routes>
		</div>
  )
}

export default App

// import { useState } from 'react';
// import Login from './pages/login/Login';
// import SignUp from './pages/signup/SignUp';
// import { Route, Routes, useNavigate } from "react-router-dom";
// import Home from './pages/home/Home';
// import { useAuthContext } from '../context/AuthContextProvider';

// function App() {
//   const navigate = useNavigate();
//   const { authUser } = useAuthContext();

//   return (
//     <div className='p-4 h-screen flex items-center justify-center'>
//       <Routes>
//         <Route path="/" element={authUser ? <Home /> : navigate("/login")} />
//         <Route path="/login" element={authUser ? navigate("/") : <Login />} />
//         <Route path="/signup" element={authUser ? navigate("/") : <SignUp />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;
