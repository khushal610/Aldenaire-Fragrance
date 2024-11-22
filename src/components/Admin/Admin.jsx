import React, { useEffect, useState } from 'react';
import {Link, Outlet, useNavigate} from 'react-router-dom';
import axios from 'axios';
import './adminStyle.css';
// import { jwtDecode } from 'jwt-decode';

function Admin() {

  const [userData,setUserData] = useState('');
  const navigate = useNavigate(); 

  const AdminToken = window.localStorage.getItem("AdminToken");

  const verify = async() => {
    await axios.post('http://localhost:3000/admin-logged',{
      AdminToken:window.localStorage.getItem("AdminToken")
    })
    // .then((res) => { res.json() })
    .then((data) => {
      setUserData({userData:data.data});
      console.log(userData);
    });
  };

  useEffect(() => {
    if(!AdminToken) {
      alert('Secured Site Login First');
      navigate('/login');
      return;
    }
    verify();
  },[])

  if (!AdminToken) { 
    return null; 
  }

  return (
    <div className='flex'>
        <div className='left-admin-panel w-2/12 flex flex-col items-center pt-10'>
          <div className='flex flex-col gap-3 py-3'>
          <Link to="/admin/product">Add/Update Products</Link>
          <Link to="/admin/manage-products">Manage Products</Link>
          <Link to="/admin/orders">Manage Orders</Link>
          <Link to="/admin/users">Manage Users</Link>
          <Link to="/admin/feedback">Feedback</Link>
          <Link to="/admin/contact-query">User Query</Link>
          <Link to="/admin/sell-report">Sell Reports</Link>
          </div>
        </div>
        <div className='right-admin-panel w-10/12 h-full flex items-center justify-center'>
            <Outlet />
        </div>
    </div>
  )
}

export default Admin
