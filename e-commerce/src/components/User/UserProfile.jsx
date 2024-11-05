import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './user.css';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';


function UserProfile() {

  const [userData, setUserData] = useState(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [contact, setContact] = useState('');
  const navigate = useNavigate();

  const token = window.localStorage.getItem('token');
  const decodeToken = jwtDecode(token);
  const email = decodeToken.email;
  console.log(email);
  const fetchUserDetails = async () => {
    try {
      const result = await axios.post('http://localhost:3000/api/user-profile-details', { email });
      if (result.data && result.data.userInfo) {
        const userInfo = result.data.userInfo[0]; 
        setUserData(userInfo);
        setUserName(userInfo.username);
        setUserEmail(userInfo.email);
        setContact(userInfo.contact);
      }
    } catch (error) {
      console.error("Error fetching user details: ", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const deleteUserAccount = async() => {
    try{
      let checkDeleteStatus = confirm('You really want to delete your account?');
      if(checkDeleteStatus){
        const deleteUser = await axios.post('http://localhost:3000/api/deleteUserAccount',{ email });
        console.log(deleteUser.data.data);
        if(deleteUser){
          const deleteUserOrder = await axios.post('http://localhost:3000/api/deleteUserOrder-afterProfileDelete',{ email })
          .catch((err) => console.log(err));
          console.log(deleteUserOrder.data.data);
          alert('Account Deleted Successful');
          window.localStorage.clear();
          navigate('/login');
        }
      }
      else{
        alert('process abort');
      }
    }catch(error){
      console.log(error);
    }
  }


  return (
    <div className='profile-body flex justify-center'>
      <div className='bg-green-600 profile-panel-container flex justify-center w-10/12 p-4'>
        <div className='user-profile-left-side w-4/12'>
          <div className='user-profile-container flex flex-col'>
            <div className='user-profile-image flex justify-center'>
              <img src="../Perfume/Perfume Image/user3final.png" alt="Profile Picture" width={"60%"}/>
            </div>
            <div className='user-information text-center pt-1'>
              <p className='font-medium'>{userName}</p>
              <p>{userEmail}</p>
              <p>{contact}</p>
            </div>
            <div className='user-profile-handler text-center pt-16 p-5 flex flex-col gap-3'>
              <NavLink to={'/profile/details'}><p>My Account</p></NavLink>
              <NavLink to={'/profile/orders'}><p>My Order</p></NavLink>
              <NavLink to={'/profile/feedback'}><p>My Feedback</p></NavLink>
              <button onClick={deleteUserAccount}>Delete Account</button>
            </div>
          </div>
        </div>
        <div className='user-profile-right-side w-10/12 bg-blue-300'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
