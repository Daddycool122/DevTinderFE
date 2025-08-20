import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../utils/requestsSlice";
import { useDispatch, useSelector } from "react-redux";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const respondToRequest = async(status, _id)=>{
    try{
        const res = await axios.post(BASE_URL + '/request/review/'+status+'/'+_id , {},{withCredentials:true});

        dispatch(removeRequest(_id))
        
    }
    catch(err){
        console.error(err)
    }
  }

  const getRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if(!requests){
        getRequests();
    }
    
  }, []);

  if (!requests) return;

  if (requests.length === 0) return <div className='flex justify-center text-white text-3xl my-10'>No requests yet</div>;

  return (
    <div className="flex flex-col items-center px-4">
      <div className="font-bold text-3xl sm:text-4xl m-4 text-center">
        Requests
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
        {requests.map((request, index) => {
          const { firstName, lastName, photoUrl, about, gender, age } =
            request.fromUserId;
          return (
            <div
              key={index}
              className="bg-base-300 rounded-xl shadow-md p-6 flex flex-col justify-between"
            >
              {/* User Info side-by-side */}
              <div className="flex items-center gap-4 w-full">
                <img
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-full"
                  src={photoUrl}
                  alt={firstName}
                />
                <div className="flex-1">
                  <div className="font-semibold text-lg">
                    {firstName + " " + lastName}
                  </div>
                  <div className="text-sm text-gray-600">{about}</div>
                  {age && gender && (
                    <div className="text-xs uppercase font-semibold opacity-60">
                      {age + " " + gender}
                    </div>
                  )}
                </div>
              </div>

              {/* Buttons at the bottom */}
              <div className="flex gap-3 w-full mt-6">
                <button className="btn bg-green-700 flex-1 text-white" onClick={()=>{respondToRequest('accepted',request._id)}}>Accept</button>
                <button className="btn bg-red-700 flex-1  text-white" onClick={()=>{respondToRequest('rejected',request._id)}}>Reject</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
