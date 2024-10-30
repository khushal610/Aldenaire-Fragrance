import React, { useState } from 'react'
import { MdPhone } from "react-icons/md";
import { FaInstagram,FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RiContactsFill } from "react-icons/ri";
import axios from 'axios';

function Contact() {

  const [username,setUserName] = useState('');
  const [email,setEmail] = useState('');
  const [contact,setContact] = useState('');
  const [message,setMessage] = useState('');

  const handleContactForm = async(e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:3000/api/contact-us',{ username,email,contact,message })
        .catch((err) => console.log(err));

        console.log(response.status);
        alert("Form Submitted");
        
        // console.log(username);
        // console.log(email);
        // console.log(contact);
        // console.log(message);
      } catch (error) {
        console.log(error);
      }
  }

  return (
    <div className='w-full flex flex-col items-center justify-center pt-10'>
      <div className='flex'>
        <div className='left-contact-section w-6/12'>
          <div className='content-holder flex flex-col gap-4 p-7'>
            <h1 className='text-3xl font-medium flex items-center gap-2'><RiContactsFill /> Contact us</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex eaque dolor omnis neque, ipsam ab debitis, numquam dignissimos praesentium ducimus at expedita. Aperiam tempore aspernatur eum, et ut ex illum quisquam nulla enim tenetur nisi omnis fugiat nobis. Debitis, quisquam!</p>
            <p className='flex items-center'><MdPhone /> +91 98972 21323</p>
            <div className='social-contact-support'>
              <p className='text-xl font-medium'>Follow us</p>
              <div className='flex items-center gap-2'>
                <p><FaInstagram /></p>
                <p><FaXTwitter /></p>
                <p><FaYoutube /></p>
              </div>
            </div>
          </div>
        </div>

        <div className='right-contact-section w-6/12'>
          <div className='form-container pt-5 p-10'> {/* bg-red-400 */}
            <form method='post' onSubmit={handleContactForm}>
              <div className='form-field-container flex flex-col gap-3 w-10/12'>
                <div>
                  <input 
                    type="text" 
                    className='border outline-none w-full p-2' 
                    placeholder='Name' 
                    required 
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div>
                  <input 
                    type="text" 
                    className='border outline-none w-full p-2' 
                    placeholder='Email' 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <input 
                    type="text" 
                    className='border outline-none w-full p-2' 
                    placeholder='Phone' 
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </div>
                <div>
                  <textarea 
                    className='border outline-none w-full p-2 resize-none' 
                    rows={"7"} 
                    cols={"50"} 
                    placeholder='Message' 
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <div>
                  <button className='px-10 py-2 speacial-btn rounded-sm' type='submit'>Send</button>
                </div>
              </div>  
            </form>
          </div>
        </div>
      </div>
      <div className='map-container p-10'>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.421272329706!2d72.674464!3d23.045012099999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8712b630f47d%3A0xdf6aa06f82fd6662!2sUNO%20AROMA%20(PERFUME%20STORE)%20-%20Nikol%2C%20Ahmedabad!5e0!3m2!1sen!2sin!4v1729729333546!5m2!1sen!2sin" width="1200" height="400" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  )
}

export default Contact
