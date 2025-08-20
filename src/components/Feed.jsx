import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import UserCard from './UserCard'
const Feed = () => {
  
  
  const userFeed = useSelector((store) => store.feed);
  const count=0;

  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        
        withCredentials: true,
      });
      console.log(res);
      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };
  
  
  useEffect(() => {
    if (userFeed) return;
    getFeed();
  }, []);


  return userFeed&&(
    <div className=' flex justify-center my-10 '>
        <UserCard  user= {userFeed[1]}/>
    </div>
  )
};

export default Feed;
