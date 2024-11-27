import React, { useEffect,useState } from 'react'
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

function ProfileDetails() {

    const [userData, setUserData] = useState(null);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');

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
            setAddress(userInfo.address);
        }
        } catch (error) {
            console.error("Error fetching user details: ", error);
        }
    };

    const updateUserProfile = async (e) => {
        e.preventDefault();
    
        try {
          await axios.post('http://localhost:3000/api/update-user-profile', { userName, userEmail, contact, address });
          alert("User Profile Updated");
          fetchUserDetails();
        } catch (error) {
          console.log(error);
        }
    };

    useEffect(() => {
        fetchUserDetails();
    },[])

  return (
    <div className='w-full p-10'>
        <form method='post' className='flex flex-col gap-5'>
            <div className='flex flex-col gap-10'>
                <input
                    className='bg-transparent border-b border-black outline-none px-1 w-8/12'
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <input
                    className='bg-transparent border-b border-black outline-none px-1 w-8/12'
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    readOnly
                />
                <input
                    className='bg-transparent border-b border-black outline-none px-1 w-8/12'
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                />
                <input
                    className='bg-transparent border-b border-black outline-none px-1 w-8/12'
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            <div className='button-container pt-5'>
            <button
              className='speacial-btn2 rounded-md px-5 py-2'
              onClick={updateUserProfile}
            >
              Save
            </button>
          </div>
        </form>
    </div>
  )
}

export default ProfileDetails
