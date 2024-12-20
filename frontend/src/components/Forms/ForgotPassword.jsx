import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './FormStyle.css'

function ForgotPassword() {
    const [verifyEmail,setVerifyEmail] = useState('');
    const [genOtp,setGenOtp] = useState('');
    const [otp,setOtp] = useState('');
    const navigate = useNavigate();
    const [isOtpValid,setIsOtpValid] = useState()
    const [resetPassword,setResetPassword] = useState('')

    useEffect(() => {
        const otpValid = window.localStorage.getItem("isOtpValid");
        if (otpValid === "true") {
            setIsOtpValid(true);
        }
    }, []);
    
    const sendOtp = async(e) => {
        e.preventDefault();
        if(!verifyEmail){
            alert('Please enter your email');
            return;
        }
        try {
            const res = await axios.post('http://localhost:3000/api/sendOTP',{ verifyEmail })            
            
            if (res.data && res.status === 200) {
                setGenOtp(res.data.data);
                alert('Check your email for the OTP.');
                console.log('Generated OTP:', res.data.data);
            } else {
                alert('Failed to send OTP. Please try again.');
            }

        } catch (error) {
            console.log(error);
            alert('An error occurred while sending the OTP.');
        }        
    }

    const verifyOTP = () => {
        if(genOtp !== Number(otp)){
            alert('OTP is invalid');
        }else{
            alert('OTP is matched');
            setIsOtpValid(true);
            window.localStorage.setItem("isOtpValid", "true");
        }
    }


    const handleResetPassword = async(e) => {
        e.preventDefault();
        if(!resetPassword){
            alert("Please fill out the password");
        }
        try {
            const res = await axios.post("http://localhost:3000/api/reset-password",{ verifyEmail,resetPassword })
            .catch((err) => {console.log(err)});
            window.localStorage.removeItem("isOtpValid");
            alert("Password changed successfully");
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <div className='w-full p-20 flex items-center justify-center'>
        <div className='h-full w-10/12 flex items-center justify-center relative z-2'>
            <div className='relative'></div>
            <div className='shadow-2xl rounded-md w-3/6 p-4'>
                <form method='post' onSubmit={sendOtp}>
                    {
                        isOtpValid ?
                    <div className='p-7 flex flex-col gap-3'>
                        <div>Do not refresh page during changing the password</div>
                        <div className='flex flex-col items-start gap-2'>
                            <p>Create a new password</p>
                            <input 
                                type="password"
                                className='outline-none p-2 rounded-md w-full shadow-md'
                                id='resetPasswordValue'
                                placeholder='Enter your new password'
                                value={resetPassword}
                                onChange={(e) => setResetPassword(e.target.value)}
                                required
                            />
                            <div className='flex gap-1'>
                                <input 
                                    type="checkbox"
                                    id='checkBox1'
                                    className='cursor-pointer'
                                    onClick={() => {
                                        const input = document.getElementById('resetPasswordValue');
                                        input.type = input.type === 'password' ? 'text' : 'password';
                                    }}
                                />
                                <p>Show password</p>
                            </div>
                        </div>
                        <div>
                            <button 
                            type='button' 
                            className='bg-red-600 px-3 py-2 rounded-sm'
                            onClick={handleResetPassword}
                            >
                                Change Password
                            </button>
                        </div>
                    </div>
                    :
                    <div className='flex flex-col gap-4 pt-4'>
                        <h1 className='text-3xl'>Forgotten Your Password?</h1>
                        <div className='w-full'>
                            <p>Email</p> 
                            <input 
                                type="email" 
                                className='outline-none rounded-md p-2 w-full shadow-md' 
                                placeholder='Enter registered email' 
                                name='verifyemail'
                                value={verifyEmail}
                                id='email'
                                onChange={(e) => setVerifyEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className='w-full'>
                            <p>OTP</p> 
                            <input 
                                type="text" 
                                className='outline-none rounded-md p-2 w-full shadow-md' 
                                placeholder='Enter your OTP' 
                                name='otp'
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>
                        <div className='flex gap-3'>
                            <button type='submit' className='button bg-orange-500 p-2 text-white transition duration-300 rounded-sm hover:text-orange-500 hover:bg-white hover:border-orange-500 hover:border'>
                                Send OTP
                            </button>
                            <button type='button' onClick={verifyOTP} className='button bg-orange-500 p-2 text-white transition duration-300 rounded-sm hover:text-orange-500 hover:bg-white hover:border-orange-500 hover:border'>
                                Verify OTP
                            </button>
                        </div>
                    </div>
                    }
                    
                </form>
            </div>
        </div>
    </div>
  )
}

export default ForgotPassword
