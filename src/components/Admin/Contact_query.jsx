import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Contact_query() {

    const [contactusData,setContactusData] = useState([]);

    useEffect(() => {
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
        fetchContactUsData();
    },[])

  return (
    <div className='contact-page-main-container overflow-x-scroll w-full p-10'>
        <div className='table-container'>
            <table className='table-auto border-2 border-black table1'>
                <thead>
                    <tr className='tr1'>
                        <th className='th1 w-2/12'>Username</th>
                        <th className='th1 w-3/12'>Email</th>
                        <th className='th1 w-1/12'>Contact</th>
                        <th className='th1 w-6/12'>Message</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        contactusData.map((element,index) => {
                            return <tr className='tr1' key={index}>
                                <td className='td1' width={"10%"}>{element.username}</td>
                                <td className='td1' width={"10%"}>{element.email}</td>
                                <td className='td1' width={"10%"}>{element.contact}</td>
                                <td className='td1' width={"30%"}>{element.message}</td>
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
