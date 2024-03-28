import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userID');

    // Navigate back to the main page
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-semibold">
          Task App
        </Link>
        <div>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-700 transition duration-300 ease-in-out"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;