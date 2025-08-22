import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import UserCard from './UserCard';

const LIMIT = 10;

const Feed = () => {
  const userFeed = useSelector(store => store.feed);
  const dispatch = useDispatch();
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);

  const getFeed = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/user/feed?skip=${skip}&limit=${LIMIT}`, {
        withCredentials: true,
      });
      const users = res.data.data;
      if (users && users.length > 0) {
        dispatch(addFeed(users));
        setSkip(prev => prev + users.length);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial feed on mount
  useEffect(() => {
    if (!userFeed || userFeed.length === 0) {
      getFeed();
    }
  }, []);

  // Fetch next batch automatically when feed becomes empty
  useEffect(() => {
    if (!loading && userFeed && userFeed.length === 0) {
      getFeed();
    }
  }, [userFeed]);

  if (!userFeed) return null;

  if (userFeed.length === 0 && !loading)
    return <div className='flex justify-center font-bold text-2xl my-10'>No more Users to show...</div>;

  return (
    <div className='flex justify-center my-10'>
      {userFeed[0] && <UserCard user={userFeed[0]} />}
      {loading && <p className="text-center mt-4">Loading more users...</p>}
    </div>
  );
};

export default Feed;
