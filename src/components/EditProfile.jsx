import React from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import UserCard from './UserCard'
import {useDispatch} from 'react-redux'
import {addUser} from '../utils/userSlice'
const EditProfile = () => {
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [gender, setGender] = useState(user.gender);
  const [age, setAge] = useState(user.age);
  const [errorMessage,setErrorMessage] = useState('')
  const [toast,setToast]= useState(false);

  const saveUser = async () => {
    try {
      const res = await axios.post(
        BASE_URL+'/profile/edit',
        {
          "firstName": firstName,
          "lastName": lastName,
          "about": about,
          "photoUrl": photoUrl,
          "gender": gender,
          "age": age,
          
        },
        {
          withCredentials: true
        }
      );
      console.log(res.data);
      dispatch(addUser(res.data.data));
      setErrorMessage('')
      setToast(true);
      setTimeout(()=>{
        setToast(false)
      },3000)
    } catch (err) {
      setErrorMessage(err.response.data)
      console.error("PATCH Error:", err);
    }
  };

  return (
    <>
    <div className="flex  justify-center  my-5 gap-4">
      
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Edit</h2>
          <fieldset className="fieldset p-2">
            <legend className="fieldset-legend">First Name</legend>
             
            <input
              type="text"
              value={firstName}
              className="input"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset p-2">
            <legend className="fieldset-legend">Last Name</legend>
            <input
              type="text"
              value={lastName}
              className="input"
              onChange={(e) => setLastName(e.target.value)}
            />
          </fieldset>
          
          <fieldset className="fieldset p-2">
            <legend className="fieldset-legend">Photo URL</legend>
            <input
              type="text"
              value={photoUrl}
              className="input"
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </fieldset>

          
          <fieldset className="fieldset p-2">
  <legend className="fieldset-legend">Gender</legend>

  <div className="flex justify-between items-center gap-2">
    {/* Controlled input so user can still type if they want */}
    <input
      type="text"
      value={gender}
      className="input flex-1"
      onChange={(e) => setGender(e.target.value)}
      placeholder="Enter gender"
    />

    {/* Dropdown for quick selection */}
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn m-1">
        Select
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-1 w-40 p-2 shadow-sm"
      >
        <li>
          <a onClick={() => setGender("male")}>Male</a>
        </li>
        <li>
          <a onClick={() => setGender("female")}>Female</a>
        </li>
        <li>
          <a onClick={() => setGender("other")}>Other</a>
        </li>
      </ul>
    </div>
  </div>
</fieldset>

          <fieldset className="fieldset p-2">
            <legend className="fieldset-legend">Age</legend>
            <input
              type="text"
              value={age}
              className="input"
              onChange={(e) => setAge(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset p-2">
          <legend className="fieldset-legend">About</legend>
          <textarea value={about} className="textarea "  onChange={(e) => setAbout(e.target.value)} placeholder="about"></textarea>
          </fieldset>
          <div className="card-actions justify-center">
           
            {errorMessage && <div className='flex  justify-center p-2 text-red-600'>{errorMessage}</div>}
            <button className="btn btn-primary" onClick={saveUser}>
              Edit Profile
            </button>
          </div>
          
        </div>
        
      </div>
      <UserCard user = {{firstName,lastName,photoUrl,about,gender,age}}/>
    </div>
    {toast&&<div role="alert" className="alert alert-success ml-150 w-80 ">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <span>User profile updated successfully</span>
</div>}
</>
  );
};

export default EditProfile; 