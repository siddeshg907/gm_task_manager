import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
import axios from "axios";

function Main() {
  const isAuth = isAuthenticated(); // You should replace this with your authentication logic
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const userID = localStorage.getItem("userID");

  const handleGetStarted = () => {
    if (isAuth) {
      navigate("/tasks");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    axios
      .get(`https://good-shoe-cow.cyclic.app/users`)
      .then((response) => {
        const foundUser = response.data.filter((u) => u._id === userID);
        setUser(foundUser[0].name);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="flex flex-col text-center items-center justify-center h-screen">
      <h2 className="text-3xl font-bold mb-4 text-blue-700">
        Task Management App
      </h2>

      {isAuth ? (
        <p className="text-lg text-gray-600 font-bold mb-8">{`Welcome ${user} to your own Task management app`}</p>
      ) : (
        <p className="text-lg text-gray-600 mb-8 w-80 font-bold">
          Task management app allow you to organize your tasks
          systematically,you can streamline your workflow and boost
          productivity.Helps you prioritize tasks based on their importance and
          urgency.
        </p>
      )}
      <button
        onClick={handleGetStarted}
        className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
      >
        {isAuth ? "Lets Add tasks!!" : "Get Started"}
      </button>
    </div>
  );
}

export default Main;
