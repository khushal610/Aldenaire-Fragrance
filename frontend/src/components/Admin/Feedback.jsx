import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import axios from 'axios'

function Feedback() {

  const [feedback,setFeedback] = useState([]);

  const feedbackData = async() => {
    try {
      const response = await axios.get('http://localhost:3000/api/send-feedback-data-admin').catch((e) => { console.log(e) });
      if(response.data.status == "ok" && response.data){
        setFeedback(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const deleteFeedback = async(e,id,email) => {
    try {
      const deleteData = await axios.post('http://localhost:3000/api/delete-feedback-from-admin',{ id,email })
      .catch((err) => { console.log(err) });
      if(deleteData){
        alert('Feedback deleted');
        feedbackData();
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    feedbackData();
  },[])

  return (
    <div className='feedback-data-body-admin py-10'>
      <h1 className='py-5 text-2xl'>Feedback Data</h1>
      <div className='feedback-table-container overflow-x-scroll'>
        <table>
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
            {
              feedback.map((element,index) => {
                return <tr className='tr1' key={index}>
                  <td className='td1'>{element.username}</td>
                  <td className='td1'>{element.email}</td>
                  <td className='td1'>{element.rate}</td>
                  <td className='td1'>{element.suggestion}</td>
                  <td className='td1'><MdDelete className='cursor-pointer' onClick={(e) => deleteFeedback(e,element._id,element.email)} /></td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Feedback
