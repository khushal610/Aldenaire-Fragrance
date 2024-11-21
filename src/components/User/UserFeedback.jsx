import React, { useEffect,useState } from 'react'
import './user.css'
import { MdDelete } from "react-icons/md";
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

function UserFeedback() {

  const token = window.localStorage.getItem("token");
  const decodeToken = jwtDecode(token);
  const email = decodeToken.email;
  
  // const navigate = useNavigate();

  const [feedbackData,setFeedbackData] = useState([]);

  const fetchFeedBackFormData = async() => {
    try {
      const response = await axios.post('http://localhost:3000/api/get-feedback-data',{ email });
      setFeedbackData(response.data.data);
      console.log(feedbackData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(!token){
      return alert('Please login first');
    }
    fetchFeedBackFormData();
  },[])

  const deleteFeedback = async(e,id,email) => {
    e.preventDefault();
    try {
      let checkConfirmation = confirm('You really want to delete your feedback');
      if(checkConfirmation){
        console.log(id,"Object ID");
        console.log(email,"email");
        const deleteFormData = await axios.post('http://localhost:3000/api/delete-feedback-data',{ id,email })
        .catch((e) => { console.log(e) });
        if(deleteFormData.data && deleteFormData.data.status === "ok"){
          alert('Feedback deleted');
          console.log(deleteFormData,"into the if condition");
          fetchFeedBackFormData();
        }
        else{
          alert('Some error occur to delete feedback data,try again later...',console.error());
        }
      }
      else{
        alert('process abort');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='w-full h-full flex items-center justify-center'>
        <div className='user-feedback-table-container w-full'>
          {feedbackData.length > 0 ?
            <table className='table1'>
              <thead>
                <tr className='tr1'>
                  <th className='th1'>Username</th>
                  <th className='th1'>Email</th>
                  <th className='th1'>Rate</th>
                  <th className='th1'>Suggestion</th>
                  <th className='th1'>Delete</th>
                </tr>
                </thead>
                <tbody>
                    {feedbackData.map((element,index) => {
                      return <tr className='tr1' key={index}>
                        <td className='td1'>{element.username}</td>
                        <td className='td1'>{element.email}</td>
                        <td className='td1'>{element.rate}</td>
                        <td className='td1'>{element.suggestion}</td>
                        <td className='td1'><MdDelete className='cursor-pointer' onClick={(e) => deleteFeedback(e,element._id,element.email)} /></td>
                      </tr>
                    })}
                </tbody>
            </table>
                    :
                    (
                      <>
                        <div className='user-feedback-no-data h-full w-full flex items-center justify-center'>
                          <div className='flex flex-col items-center gap-2'>
                            <h1 className='text-2xl'>No Feedback Provided</h1>
                            <NavLink to={"/feedback"}><button className='speacial-btn2 px-4 py-2 rounded-md'>Give Feedback!</button></NavLink>
                          </div>
                        </div>
                      </>
                    )
                  }
        </div>
    </div>
  )
}

export default UserFeedback
