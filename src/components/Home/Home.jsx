import React, { useEffect,useState } from 'react'
import '../../App.css'
import Typewriter from 'typewriter-effect';
import HomeCard from '../Card/HomeCard';
import AOS from 'aos'
import 'aos/dist/aos.css'
import { RiContactsFill,RiMoneyRupeeCircleFill } from "react-icons/ri";
import { GiDelicatePerfume,GiFragrance } from "react-icons/gi";
import { MdPhone } from "react-icons/md";
import { FaInstagram,FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import WhyCard from '../Card/WhyCard';
import axios from 'axios'
// E:\sem5-project\e-commerce\node_modules\aos\dist\aos.css

function Home() {

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
        setUserName('');
        setEmail('');
        setContact('');
        setMessage('');
      } catch (error) {
        console.log(error);
      }
  }

  useEffect(() => {
    AOS.init({
      offset: 130,
      duration: 600,
      easing: 'ease-in-sine',
      delay: 100,
    });
  },[])

  return (
    <>
      {/* -------------------------------------------------section 1--------------------------------------- */}
      <section className='max-h-screen'>
        <div className='home-body w-full h-screen'>
          <div className='home-cover-video h-full'>
            <video src="Perfume/Perfume Video/Acqua di Gio _ 3D Product Animation _ 3D Perfume.mp4" muted autoPlay loop className='w-screen h-full object-cover'></video>
          </div>
          <div className='min-h-screen home-container flex items-center justify-center'>
              <div className='right-part-home p-5 w-full flex flex-col items-center justify-center text-white'>
                <p className='text-3xl speacial-text'>
                  <Typewriter
                    options={{
                      strings: [
                        "Spritzing perfumes to make everyone's day around me better", 
                        "A gentleman's signature is not complete without his scent."
                      ],
                      autoStart: true,
                      loop: true,
                      delay:30,
                    }}
                  />
                </p>
                <div className='flex gap-4 pt-10 text-black'>
                  <button className='btn1 px-5 py-2 rounded-full'>View More</button>
                  <button className='btn1 px-5 py-2 rounded-full'>View More</button>
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------section 2--------------------------------------------- */}
      <section className='pt-10'>
        <div className='component-title text-center' data-aos="zoom-in-right">
          <h1 className='text-4xl'>Our Popular Products</h1>
        </div>
        <div className='card-Container max-w-full flex flex-wrap items-center justify-center gap-4 p-5' data-aos="fade-up">
          <HomeCard imgSrc={"Perfume/Perfume Image/6983.jpg"} />
          <HomeCard imgSrc={"Perfume/Perfume Image/ladies-perfume-mock-up_1057389-46735.jpg"} />
          <HomeCard imgSrc={"Perfume/Perfume Image/bottle-blue-perfume-sits-table-two-glasses_1165863-13929.jpg"} />
          <HomeCard imgSrc={"Perfume/Perfume Image/2150669159.jpg"} />
        </div> 
      </section>

      <section className='py-10 px-10 bg-slate-50'>
        <h1 className='text-3xl py-7 text-center' data-aos="zoom-in-left">Why to choose us?</h1>
        <div className='w-full flex items-center gap-4' data-aos="zoom-in-up">
          <WhyCard 
            icon={<RiMoneyRupeeCircleFill className='text-6xl' />}
            title={"Less Price"} 
            description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, consequuntur quis non beatae quod molestiae culpa iusto fuga sed delectus voluptate adipisci reprehenderit nisi nemo?"}
          />
          <WhyCard 
            icon={<GiDelicatePerfume className='text-6xl' />}
            title={"National Brands"} 
            description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, consequuntur quis non beatae quod molestiae culpa iusto fuga sed delectus voluptate adipisci reprehenderit nisi nemo?"}
          />
          <WhyCard 
            icon={<GiFragrance className='text-6xl' />}
            title={"Premium Quality Ingredients"} 
            description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, consequuntur quis non beatae quod molestiae culpa iusto fuga sed delectus voluptate adipisci reprehenderit nisi nemo?"}
          />
        </div>
      </section>


      <section className='p-10 flex items-center justify-around gap-4'>
        <div className='w-6/12 p-5' data-aos="zoom-out-right">
          <div className='flex gap-10'>
            <img src="Perfume/Perfume Image/pexels-gizem-ozkan-332280659-25006501.jpg" width={"50%"} className='border border-black p-2' alt="" />
            <img src="Perfume/Perfume Image/ladies-perfume-mock-up_1057389-46735.jpg" width={"50%"} className='pt-20 p-2' alt="" />
          </div>
        </div>
        <div className='w-5/12'>
          <h1 className='text-3xl py-3'>Perfume Quality</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos temporibus recusandae odit magni nesciunt soluta, iure porro, laborum veritatis, fugit placeat consequuntur repellendus molestiae praesentium illum. Accusantium doloribus iure, error quisquam sint, exercitationem, magnam sunt soluta voluptates veritatis tempore nesciunt.</p>
        </div>
      </section>
      

      <section className='flex items-center bg-slate-100'>
        <div className='w-6/12 p-5'>
          <div className='flex'>
            <div className='p-2 w-6/12 flex celebrity-ad-img-container' data-aos="fade-down-right">
              <img src="Perfume/Perfume Image/perfume1.png" className='object-scale-down' alt="" />
            </div>
            <div className='mt-20 p-2 w-6/12 flex bg-orange-400 celebrity-ad-img-container' data-aos="zoom-in">
              <img src="Perfume/Perfume Image/perfume8.jpg" alt="" />
            </div>
          </div>

          <div className='flex'>
            <div className='p-2 w-6/12 flex bg-blue-400 celebrity-ad-img-container' data-aos="flip-left">
              <img src="Perfume/Perfume Image/perfume7.jpg" alt="" />
            </div>
            <div className='p-2 w-6/12 flex celebrity-ad-img-container' data-aos="flip-right">
              <img src="Perfume/Perfume Image/perfume10.jpg" className='h-80' alt="" />
            </div>
          </div>
        </div>

        <div className='w-6/12 p-10'>
          <h1 className='text-3xl py-3'>Celebrity Ads</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam beatae modi voluptas vitae repellendus magni quis! Nihil corrupti id odit facilis deleniti, aliquam atque non qui obcaecati ex molestias itaque dignissimos animi placeat eum repudiandae necessitatibus? Ad officia deleniti, sapiente omnis ipsum distinctio doloribus assumenda enim. Saepe porro neque maxime.</p>
        </div>
      </section>


      {/* -----------------contact form------------------- */}
      <section className='py-10'>
        <div className='flex'>
          <div className='left-contact-section w-6/12'>
            <div className='content-holder flex flex-col gap-4 p-7'>
              <h1 className='text-3xl font-medium flex items-center gap-2'><RiContactsFill /> Contact us</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex eaque dolor omnis neque, ipsam ab debitis, numquam dignissimos praesentium ducimus at expedita. Aperiam tempore aspernatur eum, et ut ex illum quisquam nulla enim tenetur nisi omnis fugiat nobis. Debitis, quisquam!</p>
              <p className='flex items-center'><MdPhone /> +91 12345 67890</p>
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
      </section>

    </>
  )
}

export default Home