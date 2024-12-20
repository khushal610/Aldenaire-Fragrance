import React, { useEffect } from 'react';
// import AOS from 'aos';
import * as AOS from 'aos';
import 'aos/dist/aos.css';
import ProductionProcessPointCard from '../Card/ProductionProcessPointCard';

function About() {

  useEffect(() => {
    AOS.init({
      offset: 130,
      duration: 600,
      easing: 'ease-in-sine',
      delay: 100,
    });
  },[]);

  return (
    <>
      <div className='w-full'>
        <div className='box1 flex p-10'>
          <div className='panel1 w-6/12'>
            <div className='img-container flex justify-center' data-aos="flip-left">
              <img src="Perfume/Perfume Image/actor-1.jpeg" width={"70%"} />
            </div>
          </div>
          <div className='panel2 w-6/12'>
            <div className='content-container pt-36'>
              <h1 className='text-2xl py-4'>About us</h1>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo ipsum explicabo consectetur laborum provident adipisci aliquam officiis optio sapiente! Delectus deleniti quod iure reiciendis! Odio, quidem accusamus obcaecati adipisci itaque doloribus veritatis commodi consequuntur molestiae sit amet. Nesciunt quisquam animi, cumque error vitae tenetur hic. Reprehenderit, sunt. Autem, quibusdam dolorem.</p>
            </div>
          </div>
        </div>
      </div>

      <section className='flex flex-col py-7 items-center justify-around'>
        <h1 className='py-5 text-4xl'>About Production</h1>
        <div className='flex'>
          <div className='w-6/12 p-5 flex items-center justify-center'>
            <img src="Perfume/Perfume Image/production.jpg" width={"100%"} />
          </div>
          <div className='w-6/12 flex flex-col gap-3 p-7' data-aos="zoom-in-left">
            <ProductionProcessPointCard  number={"1]"} title={"Advice & Consultancy"} process={"Discuss and refine the perfume concept with experts. Identify the target audience and market needs."} />
            <ProductionProcessPointCard  number={"2]"} title={"Fragrance Selection"} process={"Choose the desired fragrance profile based on preferences or market trends."} />
            <ProductionProcessPointCard  number={"3]"} title={"Select Components"} process={"Pick high-quality ingredients for the perfume composition."} />
            <ProductionProcessPointCard  number={"4]"} title={"Design Concept & Packaging"} process={"Develop creative packaging that aligns with the brand's vision."} />
            <ProductionProcessPointCard  number={"5]"} title={"Filling & Dispatch"} process={"Fill the perfume into bottles and prepare it for distribution."} />
          </div>
        </div>
      </section>

      {/* <section className='flex p-10 bg-slate-50'>
        <div className='w-6/12'>
          <video src="Perfume/Perfume Video/Luxury Perfume Commercial 3D Animation.mp4" controls autoPlay muted loop></video>
        </div>
        <div className='w-6/12 flex flex-col justify-center p-7'>
          <h1 className='py-3 text-3xl'>Product Intro</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione reiciendis maxime dignissimos ab voluptas explicabo quia possimus odit, debitis dolores? Nulla soluta ratione quaerat quasi officia minus aut, tempore nobis?</p>
        </div>
      </section> */}


      <section className='flex my-12 bg-slate-50'>
        <div className='w-full about-video-container relative'>
          <div className='video-shade h-full w-full absolute flex flex-col text-white items-center justify-center'>
            <h1 className='py-3 text-3xl'>Product Intro</h1>
            <p className='w-7/12'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione reiciendis maxime dignissimos ab voluptas explicabo quia possimus odit, debitis dolores? Nulla soluta ratione quaerat quasi officia minus aut, tempore nobis?</p>
          </div>
          <video src="Perfume/Perfume Video/Perfume_.mp4" className='h-full w-full object-fill' controls autoPlay muted loop></video>
        </div>
        {/* <div className='w-6/12 flex flex-col justify-center p-7'>
          <h1 className='py-3 text-3xl'>Product Intro</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione reiciendis maxime dignissimos ab voluptas explicabo quia possimus odit, debitis dolores? Nulla soluta ratione quaerat quasi officia minus aut, tempore nobis?</p>
        </div> */}
      </section>

      <section>

      </section>

    </>
  )
}

export default About
