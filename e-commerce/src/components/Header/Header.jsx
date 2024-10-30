import React, { useState, useEffect } from 'react';
import { LuLogIn } from "react-icons/lu";
import { FaShoppingCart } from "react-icons/fa";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {jwtDecode} from 'jwt-decode'; 
import axios from 'axios';

function Header() {
    const [isLogged, setIsLogged] = useState(false);
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    
    useEffect(() => {
        const loginLogoutFunctionality = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                setIsLogged(true);
                const tokenDecode = jwtDecode(token);
                const email = tokenDecode.email;
                try {
                    const response = await axios.post('http://localhost:3000/api/get-userName', { email });
                    setUserName(response.data.data);
                    console.log(response.data.data);
                } catch (error) {
                    console.error('Error fetching username:', error);
                }
            }
        };
        loginLogoutFunctionality();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLogged(false);
        setUserName('');
        navigate('/login');
    };

    return (
        <header className='header flex h-20 items-center justify-around fixed z-10 w-full'>
            <div className="logo">
                <h1 className='text-2xl text-white special-text'>Fragment</h1>
            </div>
            <div className="navigation">
                <nav>
                    <ul className='flex gap-3'>
                        <li className='hover:text-white'><Link to={'/'}>Home</Link></li>
                        <li className='hover:text-white'><Link to={'/about'}>About</Link></li>
                        <li className='hover:text-white'><Link to={'/shop-products'}>Shop</Link></li>
                        <li className='hover:text-white'><Link to={'/contact'}>Contact</Link></li>
                        <li className='hover:text-white'>
                          <Link to={'/profile'}> {isLogged ? userName : null}</Link> 
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="header-icons flex items-center justify-center gap-3">
                <NavLink to={'/cart'}>
                    <button className='rounded-full p-3 flex gap-2 items-center border-white border hover:bg-white transition duration-300 ease-in-out relative'>
                        <FaShoppingCart />
                        <p className='absolute left-6 bottom-5 bg-white px-2 rounded-full'>{0}</p>
                        {/* <p className='absolute left-6 bottom-5 bg-white px-2 rounded-full'>{itemsCounter}</p> */}
                    </button>
                </NavLink>

                {isLogged ? 
                    <button
                        onClick={handleLogout}
                        className='rounded-full px-5 py-2 flex gap-2 items-center border-white border hover:bg-white transition duration-300 ease-in-out'>
                        <LuLogIn /> Logout
                    </button>
                    :
                    <div className='flex gap-2'>
                        <NavLink to={'/login'}>
                            <button className='rounded-full px-5 py-2 flex gap-2 items-center border-white border hover:bg-white transition duration-300 ease-in-out'>
                                <LuLogIn /> Log in
                            </button>
                        </NavLink>

                        <NavLink to={'/registration'}>
                            <button className="rounded-full px-5 py-2 bg-white hover:bg-transparent hover:border-white border border-transparent transition duration-300 ease-in-out">
                                Register
                            </button>
                        </NavLink>
                    </div>
                }
            </div>
        </header>
    );
}

export default Header;
