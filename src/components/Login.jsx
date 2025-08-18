import React, { useState } from "react";
import  { useDispatch } from "react-redux";
import axios from 'axios';
import {useNavigate} from 'react-router'
import {addUser} from '../utils/userSlice'
import {BASE_URL} from '../utils/constants'
const Login = () => {
    const navigate = useNavigate()

  const [emailId, setEmailId] = useState("shraddha@gmail.com");
  const [password, setPassword] = useState("Shraddha@123");
  const dispatch = useDispatch();
  const handleLogin = async ()=>{
    try{
        const res = await axios.post(BASE_URL+"/signIn",{
            "email":emailId,
            "password": password
        },{withCredentials: true})
        dispatch(addUser(res.data.data));
        navigate('/feed')
    }
    catch(err){
        console.error(err)
    }
  }
  return (
    <div className="flex items-center justify-center my-20  ">
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <fieldset className="fieldset p-2">
            <legend className="fieldset-legend">Email</legend>
            
            <input
              type="text"
              value={emailId}
              className="input"
              placeholder="Enter your Email"
              onChange={(e)=>setEmailId(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset p-2">
            <legend className="fieldset-legend">Password</legend>
            <input 
            type="password" 
            value={password} 
            className="input" 
            placeholder="*******"
            onChange={(e)=>setPassword(e.target.value)}
             />
          </fieldset>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick = {handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
