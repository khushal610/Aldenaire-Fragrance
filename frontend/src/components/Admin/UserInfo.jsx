import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { MdDelete } from "react-icons/md";

function UserInfo() {

    const [userData,setUserData] = useState([])

    useEffect(() => {
        const fetchUserDetails = async() => {
          try {
            const res = await axios.get('http://localhost:3000/api/get-users');
            setUserData(res.data);
          } catch (error) {
            console.log(error)
          }
        };
        fetchUserDetails();
    },[])

    const deleteUser = async(element) => {
      try {
        let userDeleteStatus = confirm("Are you sure you want to delete this user");
        if(userDeleteStatus){
          const userDeleteEmail = element.email;
          console.log(userDeleteEmail);
          const deleteUserFromDataBase = await axios.post('http://localhost:3000/api/delete-user-from-admin',{ userDeleteEmail })
          .catch((err) => console.log(err));
          console.log(deleteUserFromDataBase);
          if(deleteUserFromDataBase){
            alert('User Deleted Successfully');
          }
        }
        else{
          alert('user not deleted');
        }
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <div className='py-10'>
      {/* UserInfo Page */}
      <div className='user-viewer-container overflow-x-scroll w-full p-5'>
          <h1 className='text-2xl py-3'>User Information</h1>
        <table className='table-auto border-2 table1' cellSpacing={0}>
          <thead>
            <tr className='tr1'>
              <th className='th1' scope="col">Username</th>
              <th className='th1' scope="col">Email</th>
              <th className='th1' scope="col">Contact</th>
              <th className='th1' scope="col">Address</th>
              <th className='th1' scope="col">Delete User</th>
            </tr>
          </thead>
          <tbody>
              {
                userData.map((element,index) => (
                  <tr className='tr1' key={index}>
                      <td className='td1' width={"30%"}>{element.username}</td>
                      <td className='td1' width={"50%"}>{element.email}</td>
                      <td className='td1' width={"10%"}>{element.contact}</td>
                      <td className='td1' width={"10%"}>{element.address}</td>
                      <td className='td1 flex justify-center cursor-pointer'><MdDelete onClick={() => deleteUser(element)}/></td>
                  </tr>
                ))
              }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserInfo
