import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import UserCard from './UserCard';
import { addUser } from '../utils/userSlice';

const EditProfile = () => {
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [gender, setGender] = useState(user.gender || "");
  const [age, setAge] = useState(user.age || "");
  const [skills, setSkills] = useState(user.skills || []);
  const [newSkill, setNewSkill] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [toast, setToast] = useState(false);

  const saveUser = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/profile/edit`,
        { firstName, lastName, about, photoUrl, gender, age, skills },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      setErrorMessage('');
      setToast(true);
      setTimeout(() => setToast(false), 3000);
    } catch (err) {
      setErrorMessage(err.response?.data || "Something went wrong");
      console.error("PATCH Error:", err);
    }
  };

  const addSkill = () => {
  if (skills.length >= 5) {
    alert("You can only add up to 5 skills.");
    return;
  }

  if (newSkill.trim() && !skills.includes(newSkill.trim())) {
    setSkills([...skills, newSkill.trim()]);
    setNewSkill("");
  }
};


  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center my-5 gap-4 px-2 md:px-0 pb-28">
        <div className="card bg-base-300 w-full md:w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center text-lg md:text-xl">Edit Profile</h2>

            <fieldset className="fieldset p-2">
              <legend className="fieldset-legend">First Name</legend>
              <input
                type="text"
                value={firstName}
                className="input w-full"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset p-2">
              <legend className="fieldset-legend">Last Name</legend>
              <input
                type="text"
                value={lastName}
                className="input w-full"
                onChange={(e) => setLastName(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset p-2">
              <legend className="fieldset-legend">Photo URL</legend>
              <input
                type="text"
                value={photoUrl}
                className="input w-full"
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset p-2">
              <legend className="fieldset-legend">Gender</legend>
              <div className="flex flex-col sm:flex-row gap-2 items-center">
                <input
                  type="text"
                  value={gender}
                  className="input flex-1 w-full"
                  onChange={(e) => setGender(e.target.value)}
                  placeholder="Enter gender"
                />
                <div className="dropdown">
                  <div tabIndex={0} role="button" className="btn m-1 w-full sm:w-auto">
                    Select
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-10 w-full sm:w-40 p-2 shadow-sm"
                  >
                    <li><a onClick={() => setGender("male")}>Male</a></li>
                    <li><a onClick={() => setGender("female")}>Female</a></li>
                    <li><a onClick={() => setGender("other")}>Other</a></li>
                  </ul>
                </div>
              </div>
            </fieldset>

            <fieldset className="fieldset p-2">
              <legend className="fieldset-legend">Age</legend>
              <input
                type="number"
                value={age}
                className="input w-full"
                onChange={(e) => setAge(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset p-2">
              <legend className="fieldset-legend">About</legend>
              <textarea
                value={about}
                className="textarea w-full"
                onChange={(e) => setAbout(e.target.value)}
                placeholder="About"
              />
            </fieldset>

            {/* Skills */}
            <fieldset className="fieldset p-2">
              <legend className="fieldset-legend">Skills</legend>
              <div className="flex flex-wrap gap-2 mb-2">
                {skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="badge badge-outline cursor-pointer flex items-center gap-1"
                  >
                    {skill}
                    <span onClick={() => removeSkill(skill)} className="text-red-500 font-bold">x</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  className="input flex-1"
                  placeholder="Add new skill"
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addSkill()}
                />
                <button className="btn btn-primary" onClick={addSkill}>Add</button>
              </div>
            </fieldset>

            {errorMessage && (
              <div className="flex justify-center p-2 text-red-600">{errorMessage}</div>
            )}

            <div className="card-actions justify-center mt-2">
              <button className="btn btn-primary w-full" onClick={saveUser}>
                Save Profile
              </button>
            </div>
          </div>
        </div>

        <div className="w-full md:w-96">
          <UserCard user={{ firstName, lastName, photoUrl, about, gender, age, skills }} />
        </div>
      </div>

      {toast && (
        <div
          role="alert"
          className="fixed bottom-24 left-1/2 transform -translate-x-1/2 w-11/12 md:w-80 flex justify-center items-center z-50"
        >
          <div className="alert alert-success w-full flex justify-center items-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current mr-2"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>User profile updated successfully</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
