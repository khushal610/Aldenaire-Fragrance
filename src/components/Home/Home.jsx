import React, { useEffect } from 'react'
import '../../App.css'
import Typewriter from 'typewriter-effect';
import HomeCard from '../Card/HomeCard';
import AOS from 'aos'
import 'aos/dist/aos.css'
// E:\sem5-project\e-commerce\node_modules\aos\dist\aos.css

function Home() {

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
        <div className='component-title text-center' data-aos="slide-right">
          <h1 className='text-4xl'>Our Popular Products</h1>
        </div>
        <div className='card-Container max-w-full flex flex-wrap items-center justify-center gap-4 p-5' data-aos="fade-up">
          <HomeCard imgSrc={"Perfume/Perfume Image/6983.jpg"} />
          <HomeCard imgSrc={"Perfume/Perfume Image/ladies-perfume-mock-up_1057389-46735.jpg"} />
          <HomeCard imgSrc={"Perfume/Perfume Image/bottle-blue-perfume-sits-table-two-glasses_1165863-13929.jpg"} />
          <HomeCard imgSrc={"Perfume/Perfume Image/2150669159.jpg"} />
        </div> 
      </section>

      
    </>
  )
}

export default Home