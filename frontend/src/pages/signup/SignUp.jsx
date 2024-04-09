import GenderCheckbox from "./GenderCheckBox";
import React from  'react'
import { Link } from "react-router-dom"
import { useState } from "react";
import useSignUp from "./../../../components/Hooks/useSignUp.js"
const SignUp = () => {
 const [inputs, setInputs] = useState({
    fullname:"",
    username: "",
    password: "" ,
    confirmpassword:"",
    email:"",
    gender:"",
    });
    // console.log(useSignUp)
    const [loading,signup]= useSignUp()

    const handlesubmit =async(e)=>{
        console.log(inputs)
        e.preventDefault()
        await signup(inputs)
        // console.log("Here is the error in handle submit")
    }
    const handleCheckBoxChange=(gender)=>{
        setInputs({...inputs,gender : gender})
    }

	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0'>
				<h1 className='text-3xl text-white font-semibold text-center text-gray-300'>
					Sign Up <span className='text-blue-500'> ChatApp</span>
				</h1>

				<form>
					<div>
						<label className='label p-2'>
							<span className='text-base text-white label-text'>Full Name</span>
						</label>
						<input 
                        type='text' 
                        placeholder='John Doe' 
                        className='w-full input input-bordered  h-10' 
                        onChange={(e) => setInputs({ ...inputs, fullname: e.target.value })}/>
					</div>

					<div>
						<label className='label p-2 '>
							<span className='text-base text-white label-text'>Username</span>
						</label>
						<input 
                        type='text' 
                        placeholder='johndoe' 
                        className='w-full input input-bordered h-10'  
                        onChange={(e)=>{setInputs({...inputs,username:e.target.value})}}/>
					</div>
                    <div>
						<label className='label p-2'>
							<span className='text-base text-white label-text'>Email</span>
						</label>
						<input 
                        type='text' 
                        placeholder='Email' 
                        className='w-full input input-bordered  h-10' 
                        onChange={(e)=>{setInputs({...inputs,email:e.target.value})}}/>
					</div>
					<div>
						<label className='label'>
							<span className='text-base text-white label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
                            onChange={(e)=>{setInputs({...inputs,password: e.target.value})}}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text text-white' >Confirm Password</span>
						</label>
						<input
							type='password'
							placeholder='Confirm Password'
							className='w-full input input-bordered h-10'
                            onChange={(e)=>setInputs({...inputs,confirmpassword:e.target.value})}
						/>
					</div>

					<GenderCheckbox onCheckboxChange={handleCheckBoxChange} selectedGender={inputs.gender}/>

					<Link className='text-sm text-white hover:underline hover:text-blue-600 mt-2 inline-block' to="/login">
						Already have an account?
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-2 border border-slate-700' onClick={handlesubmit}>
                            {loading?<span className="loading loading-spinner" ></span>:"Sing Up"}
                            </button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default SignUp;