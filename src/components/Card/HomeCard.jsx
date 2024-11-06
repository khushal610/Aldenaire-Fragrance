import React from 'react'
import '../../App.css'
import { useNavigate } from 'react-router-dom';

function HomeCard({name="DunHill",content="Smell Like Professionally",btnText=" - View More -",imgSrc}) {

  const navigate = useNavigate();

  const redirectShop = () => {
    navigate('/shop-products');
  }

  return (
    <div>
      <div className="relative h-[400px] w-[300px] rounded-md homeCard transition duration-300 hover:scale-105">
            <img
              src={imgSrc}
              className="z-0 h-full w-full rounded-md object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-left">
              <h1 className="text-lg font-semibold text-white">{name}</h1>
              <p className="mt-2 text-sm text-gray-300">
                {content}
              </p>
              {/* <button className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white">
                {btnText}
              </button> */}
              <button className='rounded-full mt-2 border-white border text-white px-5 py-2 inline-flex cursor-pointer items-center text-sm font-semibold hover:bg-white hover:text-black' onClick={redirectShop}>View More</button>
            </div>
          </div>
    </div>
  )
}

export default HomeCard
