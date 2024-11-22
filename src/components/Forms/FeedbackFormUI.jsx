import React,{ useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function FeedbackFormUI() {

    const [userName,setUserName] = useState();
    const [userMail,setUserMail] = useState();
    const [rating,setRating] = useState();
    const [suggestions,setSuggestions] = useState();
    const [userData,setUserData] = useState([]);

    const navigate = useNavigate();
    
    
    useEffect(() => {
      const token = window.localStorage.getItem("token");
      if(!window.localStorage.getItem("token")){
        alert('Please login first');
        navigate('/login');
        return;
      }
      try {
        const DecodeToken = jwtDecode(token);
        const email = DecodeToken.email;
  
        const fetchUserData = async() => {
          const response = await axios.post("http://localhost:3000/api/user-profile-details", { email });
          const userDetails = response.data.userInfo[0];
          setUserData(userDetails);
          setUserName(userDetails.username);
          setUserMail(userDetails.email);
        }
        fetchUserData();

      } catch(error){
        console.log(error);
      }
    },[])

    const sendFeedbackFormData = async(e) =>{
        e.preventDefault();
        try{
            console.log(userName);
            console.log(userMail);
            console.log(rating);
            console.log(suggestions);
            if(!rating){
              return alert('Select any Rating options');
            }
            const sendFeedbackData = await axios.post('http://localhost:3000/api/add-feedback-data',{ userName,userMail,rating,suggestions })
            .catch((e) => { console.log(e) });
            console.log(sendFeedbackData);
            alert('Your feedback saved');
            setUserName('');
            setUserMail('');
            setSuggestions('');
            navigate('/profile/feedback');
        }
        catch(error){
            console.log(error);
        }
    }

  return (
    <div className="feedback-body min-h-screen flex items-center justify-center bg-gray-100">
      <div className="feedback-form-container w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-semibold text-center mb-6">Feedback Form</h1>
        <form>
          {/* Name Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={userMail}
              onChange={(e) => setUserMail(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Rating Options */}
          <div className="mb-4">
            <span className="block text-sm font-medium text-gray-700 mb-2">How would you rate us?</span>
            <div className="flex flex-wrap gap-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="rating"
                    value={"Average"}
                    onChange={(e) => setRating(e.target.value)}
                    className="text-blue-600 focus:ring-blue-500 focus:ring-2 h-4 w-4"
                  />
                  <span className="mr-2 ml-1 text-gray-700">Average</span>
                  <input
                    type="radio"
                    name="rating"
                    value={"Good"}
                    onChange={(e) => setRating(e.target.value)}
                    className="text-blue-600 focus:ring-blue-500 focus:ring-2 h-4 w-4"
                  />
                  <span className="mr-2 ml-1 text-gray-700">Good</span>
                  <input
                    type="radio"
                    name="rating"
                    value={"Excellent"}
                    onChange={(e) => setRating(e.target.value)}
                    className="text-blue-600 focus:ring-blue-500 focus:ring-2 h-4 w-4"
                  />
                  <span className="mr-2 ml-1 text-gray-700">Excellent</span>
                  <input
                    type="radio"
                    name="rating"
                    value={"Poor"}
                    onChange={(e) => setRating(e.target.value)}
                    className="text-blue-600 focus:ring-blue-500 focus:ring-2 h-4 w-4"
                  />
                  <span className="mr-2 ml-1 text-gray-700">Poor</span>
                  <input
                    type="radio"
                    name="rating"
                    value={"Bad"}
                    onChange={(e) => setRating(e.target.value)}
                    className="text-blue-600 focus:ring-blue-500 focus:ring-2 h-4 w-4"
                  />
                  <span className="mr-2 ml-1 text-gray-700">Bad</span>
                </label>
            </div>
          </div>

          {/* Suggestions */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700" htmlFor="suggestions">
              Suggestions (optional)
            </label>
            <textarea
              id="suggestions"
              rows="4"
              placeholder="Write any suggestions here!"
              value={suggestions}
              onChange={(e) => setSuggestions(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full font-medium py-2 px-4 rounded-md speacial-btn"
              onClick={(e) => sendFeedbackFormData(e)}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FeedbackFormUI;
