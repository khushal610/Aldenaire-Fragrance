import React from 'react'
import '../../App.css'
import { MdEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { NavLink } from 'react-router-dom';

function Footer() {
  return (
    <>
        <footer className='footer flex items-center justify-evenly text-white h-52 z-50'>
            <div className="footer-sec1">
                <h1 className='text-2xl text-black'>#Aldenaire Fragrance</h1>
                <p>@All rights are reversed | Khushal | Harsh</p>
            </div>
            <div className="footer-sec2 flex flex-col gap-10">
                <div>
                  <h1 className='text-black text-2xl'>#Quick Links</h1>
                  <div className='flex items-center gap-2 text-black'>
                    <NavLink to={"/"}><p>Home</p></NavLink>|
                    <NavLink to={"/about"}><p>About</p></NavLink>|
                    <NavLink to={"/shop-products"}><p>Shop</p></NavLink>|
                    <NavLink to={"/contact"}><p>Contact</p></NavLink>|
                    <NavLink to={"/feedback"}><p>Feedback</p></NavLink>
                  </div>
                </div>
                <div className='social-icons text-black flex flex-col gap-2'>
                  <p>Join our social media plateform to connect with us</p>
                  <div className='flex gap-3'>
                    <p className='text-3xl cursor-pointer'><MdEmail /></p>
                    <p className='text-3xl cursor-pointer'><FaWhatsapp /></p>
                    <p className='text-3xl cursor-pointer'><FiInstagram /></p>
                  </div>
                </div>
            </div>
        </footer>
    </>
  )
}

export default Footer
