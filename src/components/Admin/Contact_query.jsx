import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import axios from 'axios'

function Contact_query() {

    const [contactusData,setContactusData] = useState([]);

    const fetchContactUsData = async() => {
        const contactDetails = await axios.get('http://localhost:3000/api/get-contact-query-details')
        .catch((err) => console.log(err));
        if(contactDetails != null){
            // console.log(contactDetails.data);
            setContactusData(contactDetails.data);
        }
        else{
            alert('No Data Found');
        }
    }
    
    useEffect(() => {
        fetchContactUsData();
    },[])

  return (
    <div className='contact-page-main-container overflow-x-scroll w-full p-10'>
        <h1 className='py-3 text-2xl'>User Contact Data</h1>
        <div className='table-container'>
            <table className='table-auto border-2 border-black table1'>
                <thead>
                    <tr className='tr1'>
                        <th className='th1 w-2/12'>Username</th>
                        <th className='th1 w-3/12'>Email</th>
                        <th className='th1 w-1/12'>Contact</th>
                        <th className='th1 w-6/12'>Message</th>
                        <th className='th1 w-6/12'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        contactusData.map((element,index) => {
                            return <tr className='tr1' key={index}>
                                <td className='td1 w-1/12'>{element.username}</td>
                                <td className='td1 w-1/12'>{element.email}</td>
                                <td className='td1 w-1/12'>{element.contact}</td>
                                <td className='td1 w-1/12'>{element.message}</td>
                                <td className='td1 w-1/12'><MdDelete /></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Contact_query
