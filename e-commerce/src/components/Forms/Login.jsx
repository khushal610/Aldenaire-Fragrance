import React,{ useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import './FormStyle.css'
import axios from 'axios'

function Login() {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [userType,setUserType] = useState('');
  const [secretKey,setSecretKey] = useState('');
  const navigate = useNavigate();

  const loginHandle = async(e) => {
    e.preventDefault();
    if (userType === "Admin" && secretKey !== "perfume") {
      alert("Invalid Secret Key");
      return;
    }
    try {
      const res = await axios.post('http://localhost:3000/api/login-user',{ email,password,userType,secretKey });
      const data = res.data;
      console.log(data, "User Login");

      if (data.userType === "User") {
        navigate("/");
        window.localStorage.setItem("token",res.data.data);
        alert("User Login Successful");
      } else if (data.userType === "Admin") {
        navigate("/admin");
        alert("Admin Login Successful");
      }
    } catch (error) {
      console.error('Login error:', error);
      alert(error.response?.data?.error || 'An error occurred during login. Please try again.');
      // alert('An error occurred during login. Please try again.');
    }
  }

  return (
    <>
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 p-5">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Log in
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Don&#x27;t have an account?{" "}
              <NavLink
              to={'/registration'}
              className="font-semibold text-black transition-all duration-200 hover:underline">
                Create a free account
              </NavLink>
            </p>
            <form method="POST" onSubmit={loginHandle} className="mt-8" >
              <div className="space-y-5">
                <div>
                    <input type="radio" name='userType' 
                    value={"User"} 
                    onChange={(e) => setUserType(e.target.value)}
                    /> User
                    {" "}
                    <input type="radio" name='userType' 
                    value={"Admin"} 
                    onChange={(e) => setUserType(e.target.value)}
                    /> Admin
                </div>
                <div>
                  {
                    userType == "Admin"?
                    <div>
                    <label className="text-base font-medium text-gray-900">
                      Secret Key
                    </label>
                      <input
                      className="text-slate-900 flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      name='Secret Key'
                      value={secretKey}
                      onChange={(e) => setSecretKey(e.target.value)}
                      placeholder="********"
                    />
                    </div>:null
                  }
                  <label className="text-base font-medium text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      className="text-slate-900 flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      name='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-base font-medium text-gray-900">
                      Password
                    </label>
                    <Link to={'/forgotpassword'} className="text-sm font-semibold text-black hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="mt-2">
                    <input
                      className="text-slate-900 flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      name='password'
                      id='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                    />
                    <div className='flex gap-2'>
                      <input 
                        type="checkbox"
                        id='checkBox1'
                        className='cursor-pointer'
                        onClick={() => {
                          const input = document.getElementById('password');
                          input.type = input.type === 'password' ? 'text' : 'password';
                        }}
                      />
                      <p>Show password</p>
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80">
                    Log in{" "}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="h-full w-full flex items-center">
          <video src="Perfume/Perfume Video/SaveInsta.App-3164163844012615895.mp4" 
          muted 
          autoPlay 
          loop 
          className='mx-auto h-4/5 w-4/5 rounded-md object-cover'></video>
        </div>
      </div>
    </section>
    </>   
  )
}

export default Login
