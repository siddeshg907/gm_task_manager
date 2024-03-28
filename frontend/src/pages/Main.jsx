import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import axios from 'axios';

function Main() {
  const isAuth = isAuthenticated(); // You should replace this with your authentication logic
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isAuth) {
      navigate('/tasks');
    } else {
      navigate('/login');
    }
  };

 

  

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-semibold mb-4">Task App</h2>
      <p className="text-lg text-gray-600 mb-8">Organize your tasks efficiently.</p>
      <button
        onClick={handleGetStarted}
        className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
      >
        Get Started
      </button>
    </div>
  );
}

export default Main;