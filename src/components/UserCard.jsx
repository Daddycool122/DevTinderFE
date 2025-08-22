import React from 'react';
import axios from 'axios';
import { removeUserFromFeed } from '../utils/feedSlice';
import { BASE_URL } from "../utils/constants";
import { useDispatch } from 'react-redux';
import { useLocation } from "react-router";

const UserCard = ({ user }) => {
  if (!user) return null;

  const { _id, firstName, lastName, about, photoUrl, skills, age, gender } = user;
  const location = useLocation();
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(`${BASE_URL}/request/send/${status}/${_id}`, {}, { withCredentials: true });
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card bg-base-300 w-full md:w-96 shadow-sm rounded-lg overflow-hidden min-h-[450px] flex flex-col">
      {/* Image */}
      <figure className="w-full h-56 overflow-hidden">
        <img
          className="w-full h-full object-cover rounded-t-xl"
          src={photoUrl}
          alt={firstName + " " + lastName}
        />
      </figure>

      <div className="card-body p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Name */}
          <h2 className="card-title text-lg md:text-xl">{firstName} {lastName}</h2>

          {/* Age & Gender */}
          {age && gender && (
            <p className="text-sm md:text-base text-gray-600">{age} {gender}</p>
          )}

          {/* About */}
          <p className="text-sm md:text-base mt-1">{about}</p>

          {/* Skills */}
          {skills && skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.map((skill, index) => (
                <div key={index} className="badge badge-outline text-xs md:text-sm">
                  {skill}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {location.pathname === '/feed' ? (
          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <button
              onClick={() => handleSendRequest("ignored", _id)}
              className="bg-purple-500 p-2 rounded-xl font-bold w-full sm:w-auto text-white hover:bg-purple-600 transition-colors"
            >
              Ignore
            </button>
            <button
              onClick={() => handleSendRequest("interested", _id)}
              className="bg-pink-400 p-2 rounded-xl font-bold w-full sm:w-auto text-white hover:bg-pink-500 transition-colors"
            >
              Interested
            </button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <button className="bg-purple-500 p-2 rounded-xl font-bold w-full sm:w-auto text-white hover:bg-purple-600 transition-colors">
              Ignore
            </button>
            <button className="bg-pink-400 p-2 rounded-xl font-bold w-full sm:w-auto text-white hover:bg-pink-500 transition-colors">
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
