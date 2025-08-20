import React from 'react';

const UserCard = ({ user }) => {
  const { firstName, lastName, about, photoUrl, skills, age, gender } = user;

  return (
    <div className="card bg-base-300 w-full md:w-96 shadow-sm rounded-lg overflow-hidden ">
      {/* Image */}
      <figure className="w-full">
        <img
          className="w-full h-full object-cover my-2 rounded-t-xl"
          src={photoUrl}
          alt={firstName + " " + lastName}
        />
      </figure>

      <div className="card-body p-4">
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

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <button
          onClick={()=>count++}
          className="bg-purple-500 p-2 rounded-xl font-bold w-full sm:w-auto text-white hover:bg-purple-600 transition-colors">
            Ignore
          </button>
          <button className="bg-pink-400 p-2 rounded-xl font-bold w-full sm:w-auto text-white hover:bg-pink-500 transition-colors">
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
