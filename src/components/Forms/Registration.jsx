import React, { useState } from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import axios from 'axios'

function Registration() {

    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [contact,setContact] = useState('')
    const [address,setAddress] = useState('')
    const navigate = useNavigate()

    const handelRegistrationForm = async(e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000",{ username,email,password,contact,address })
            .then(() => {console.log("Form submitted")})
            .catch((e) => {console.log(e)});
            alert("Registration Successful");
            navigate('/login');

            setUsername('')
            setEmail('')
            setPassword('')
            setContact('')
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <div>
        <section className="bg-gray-50 p-10">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <div className='flex gap-4 items-center justify-center'>
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Create an account
                            </h1>
                        </div>
                        <form className="space-y-4 md:space-y-6" method='post' onSubmit={handelRegistrationForm}>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                                <input 
                                    type="text" 
                                    name="username" 
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter your name" 
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-sm rounded-lg text-slate-900 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" 
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Your Contact</label>
                                <input 
                                    type="tel" 
                                    name="contact" 
                                    value={contact}
                                    onChange={(e) => setContact(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-sm rounded-lg text-slate-900 focus:border-primary-600 block w-full p-2.5" placeholder="+91 987*******" 
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    id='registrationPassword'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="•••••••••" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required
                                />
                                <div className='flex gap-2 pl-1 pt-2'>
                                    <input 
                                        type="checkbox"
                                        id='checkBox1'
                                        className='cursor-pointer'
                                        onClick={() => {
                                        const input = document.getElementById('registrationPassword');
                                        input.type = input.type === 'password' ? 'text' : 'password';
                                        }}
                                    />
                                    <p>Show password</p>
                                </div>
                                <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Address</label>
                                <textarea 
                                    rows={"5"}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 resize-none"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                            </div>
                            </div>
                           
                            
                            <button className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center border border-black hover:bg-black hover:text-white transition duration-300">Create an account</button>

                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? 
                                <NavLink to={'/login'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</NavLink>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Registration
