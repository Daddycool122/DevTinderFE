import React,{useEffect} from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router'
import Footer from './Footer'
import {useNavigate} from 'react-router'
import {useSelector} from 'react-redux'

import {useDispatch} from 'react-redux'
import {BASE_URL} from "../utils/constants"
import axios from 'axios'
import {addUser} from '../utils/userSlice'
const Body  = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector(store=>store.user)
    const fetchUser = async()=>{
        try
        {
            const user = await axios.get(BASE_URL + "/profile/view" , {withCredentials:true});
      
            dispatch(addUser(user.data.data));
        }
        catch(err){
            if(err.status===401){
            navigate('/login')
            }
            console.error(err)
        }
    }

    useEffect(()=>{
        if(!userData){
            fetchUser()
        }
        
    },[])
    
    return (
        <div> 
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    )
}

export default Body