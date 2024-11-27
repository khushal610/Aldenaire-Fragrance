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
    // let userType = "User";
    const userType = window.localStorage.getItem("userType") || "User";

    
    const token = localStorage.getItem('token');
    const AdminToken = localStorage.getItem('AdminToken');
    useEffect(() => {
        // console.log(userType);
        const loginLogoutFunctionality = async () => {
            if (AdminToken) {
                setIsLogged(true);
                const AdminTokenDecode = jwtDecode(AdminToken);
                const AdminName = AdminTokenDecode.username;
                console.log(AdminName);
                setUserName(AdminName);
            }
            if (token) {
                setIsLogged(true);
                const tokenDecode = jwtDecode(token);
                const email = tokenDecode.email;
                console.log(userType);
                try {
                    const response = await axios.post('http://localhost:3000/api/get-userName', { email });
                    setUserName(response.data.data);
                } catch (error) {
                    console.error('Error fetching username:', error);
                }
            }
        };
        loginLogoutFunctionality();
    }, []);

    const handleLogout = () => {
        const userToken = window.localStorage.getItem('token');
        const AdminToken = window.localStorage.getItem('AdminToken');
        if(userToken){
            localStorage.removeItem('token');
            localStorage.removeItem('userType');
            setIsLogged(false);
            setUserName('');
            navigate('/login');
        }
        if(AdminToken){
            localStorage.removeItem('AdminToken');
            localStorage.removeItem('userType');
            setIsLogged(false);
            setUserName('');
            navigate('/login');
        }
    };

    return (
        <header className='header flex h-20 items-center justify-around fixed z-10 w-full'>
            <div className="logo flex items-center w-4/12 pl-7 relative">
                <img src="/Public/Perfume/Perfume Image/logo1.png" width={"15%"} className='w-2/10 mr-0' />
                <h1 className='ml-0 pl-12 text-2xl text-white absolute'>ldeineire Fragrance</h1>
                {/* <h1 className='ml-0 pl-12 text-2xl text-white absolute'>LDENAIRE FRAGRANCE</h1> */}
            </div>
            <div className='navigationBar-Panel w-8/12 flex items-center justify-around'>
            {/* ---------------------------navigation bar links------------------------------- */}
                { userType == "User" ?
                    <div className="navigation flex justify-center">
                        <nav className='w-full'>
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
                    : 
                    <div>
                        <nav>
                            <ul>
                                <li>
                                    {"Admin : " + userName}
                                </li>
                            </ul>
                        </nav>
                    </div>
                }
                {/* ------------------buttons---------------------- */}
                <div className="header-icons flex items-center justify-center pr-24 gap-3">
                    {AdminToken ?
                        null
                        :
                        <NavLink to={'/cart'}>
                            <button className='rounded-full p-3 flex gap-2 items-center border-white border hover:bg-white transition duration-300 ease-in-out relative'>
                                <FaShoppingCart />
                                <p className='absolute left-6 bottom-5 bg-white px-2 rounded-full'>{0}</p>
                            </button>
                        </NavLink>
                    }

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
            </div>
        </header>
    );
}

export default Header;

