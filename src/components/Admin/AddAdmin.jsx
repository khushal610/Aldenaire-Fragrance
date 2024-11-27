import React, { useEffect, useState } from 'react';
import { IoAlertCircle } from "react-icons/io5";
import axios from 'axios';

function AddAdmin() {

    const [username,setUsername] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const [contact,setContact] = useState();

    const [adminData,setAdminData] = useState([]);

    const fetchAdminData = async() => {
        try{
            const adminDetails = await axios.get('http://localhost:3000/api/get-admin-details');
            if (adminDetails.data){
                setAdminData(adminDetails.data.data);
            }
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        fetchAdminData();
    })

    const addNewAdmin = async(e) => { 
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:3000/api/add-new-admin',{ username,email,password,contact })
            .catch((err) => console.log(err));
            // alert('Admin Created');
            if(response){
                alert('Admin Created');
                setUsername('');
                setEmail('');
                setPassword('');
                setContact('');
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <>
        <div className='flex items-center justify-center w-full'>
        {
            adminData.length < 3
            ?
                <div className="py-10 w-6/12 flex justify-center items-center ">
                <div className="w-full p-6 rounded-lg shadow-2xl border border-black">
                    <h2 className="text-2xl font-bold text-center mb-6">Add Admin</h2>
                    <form>
                    <div className="mb-4">
                        <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                        >
                        Name
                        </label>
                        <input
                        type="text"
                        id="name"
                        name="name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                        >
                        Email
                        </label>
                        <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'} // Toggle input type
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        <div className="mt-2 flex items-center">
                            <input
                                type="checkbox"
                                id="show-password"
                                className="mr-2"
                                checked={showPassword}
                                onChange={() => setShowPassword(!showPassword)}
                            />
                            <label htmlFor="show-password" className="text-sm text-gray-700">
                                Show Password
                            </label>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label
                        htmlFor="contact"
                        className="block text-sm font-medium text-gray-700"
                        >
                        Contact
                        </label>
                        <input
                        type="text"
                        id="contact"
                        name="contact"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full font-medium py-2 px-4 rounded-md shadow speacial-btn2"
                        onClick={(e) => addNewAdmin(e)}
                    >
                        Add Admin
                    </button>
                    </form>
                </div>
                </div>
            :
            (
                <div className="flex items-center justify-center h-96">
                    <h1 className='text-4xl text-red-500 capitalize flex items-center gap-1'><IoAlertCircle /> No more admin can be added</h1>
                </div>
            )
        }
    </div>
    </>
  );
}

export default AddAdmin;
