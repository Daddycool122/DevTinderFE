import React from 'react'
import { FaLaptopCode } from "react-icons/fa";
import  { useSelector } from "react-redux";
import {Link} from 'react-router'
import { BASE_URL } from '../utils/constants';
import { useNavigate } from 'react-router';
import { removeUser } from '../utils/userSlice';
import { removeFeed} from '../utils/feedSlice';
import {useDispatch} from 'react-redux'
import axios from 'axios'
const Navbar = ()=>{
  const user = useSelector(store=>store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async()=>{
    axios.post(BASE_URL+'/logout',{},{withCredentials:true})
    dispatch(removeUser());
    dispatch(removeFeed())
    navigate('/login')

  }
  
    return (
        <div className="navbar bg-base-300 shadow-sm">
  <div className="flex-1">
    <Link to='/feed' className="btn btn-ghost text-2xl font-bold"><FaLaptopCode className='mt-0.5'/>DevTinder</Link>
  </div>
  
  <div className="flex-none">
    {user&&
    <div className="dropdown dropdown-end mx-4 flex ">
      <p className="text-xs font-bold mt-3 px-1">{`Welcome ${user.firstName}`}</p>
    
      <div tabIndex={0} role="button" className=" btn btn-ghost btn-circle avatar">
        
        
        <div className="w-10 rounded-full ">
          <img
            alt="Tailwind CSS Navbar component"
            src={user.photoUrl} />
        </div>
        
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to='/profile' className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link to = '/connections'>Connections</Link></li>
        <li><a onClick = {handleLogout}>Logout</a></li>
      </ul>
    </div>}
  </div>
</div>
    )
    
}
export default Navbar;