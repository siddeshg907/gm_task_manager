import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';


const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'not completed',
    priority: 'medium',
    userID: localStorage.getItem('userID') || ''
  });
  const [showForm, setShowForm] = useState(false);
  const token = localStorage.getItem('token');
  const userID = localStorage.getItem("userID");
  const fetchData = async () => {
    try {
      
      const response = await axios.get("https://good-shoe-cow.cyclic.app/tasks", {
        headers: {
          Authorization: token,
          userID:userID, // Include userID in request headers
        },
      });
      const tasks = response.data.filter(task => task.userID === localStorage.getItem("userID"));
      // Handle tasks data
      console.log(tasks)
      setTasks(tasks);
      
      
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
console.log(userID)
  useEffect(() => {
    
    fetchData();
    
  }, [token,userID]);
  
  const handleAddTask = async (e) => {
    try {
      const response = await axios.post('https://good-shoe-cow.cyclic.app/tasks/add', {
        ...newTask,
      }, {
        headers: {
          Authorization: token,
          userID: userID
        },
      });
      // Add the new task to the state
      setTasks((prev) => [...prev, response.data]);
      // Clear the input fields for adding a new task
      setNewTask({
        title: '',
        description: '',
        status: 'not completed',
        priority: 'medium',
        userID: userID
      });
      // Fetch the updated list of tasks to reflect the new task
      fetchData();
    } catch (error) {
      console.error(error.message);
    }
  };
  

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleUpdateTask = async (task) => {
    const updatedTask = {
      ...task,
      status: task.status === 'completed' ? 'not completed' : 'completed',
    };
    try {
      await axios.patch(`https://good-shoe-cow.cyclic.app/tasks/update/${task._id}`, updatedTask, {
        headers: {
          Authorization:token,
          userID:userID
        },
      });
      setTasks((prev) => prev.map((prevTask) => (prevTask._id === task._id ? updatedTask : prevTask)));
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`https://good-shoe-cow.cyclic.app/tasks/delete/${taskId}`, {
        headers: {
          Authorization:token,
          userID:userID
        },
      });
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="flex flex-col justify-center items-center">
      
      <div className="w-full max-w-2xl p-4">
        <div className="flex justify-center">
          <h1 className="text-3xl font-semibold">Tasks</h1>
        </div>
        <hr className="mt-2 mb-6 border-gray-300" />
        <button
          className="font-bold text-blue-500 w-full py-2 mb-6 border-2 border-gray-400 rounded-md shadow-md hover:bg-gray-100 focus:outline-none"
          onClick={() => setShowForm(!showForm)}
        >
          Add a new task
        </button>
        {showForm && (
          <div className="flex flex-col my-4">
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleChange}
              placeholder="Task title"
              className="border-2 border-gray-400 p-2 rounded-md mb-4"
            />
            <textarea
              name="description"
              value={newTask.description}
              onChange={handleChange}
              placeholder="Task description"
              className="border-2 border-gray-400 p-2 rounded-md mb-4"
            />
            <div className="flex items-center">
              <div className="w-1/3">
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={newTask.priority}
                  onChange={handleChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div className="ml-4">
                <button
                  className="w-full py-2 px-4 border-2 border-gray-400 rounded-md shadow-md hover:bg-gray-100 focus:outline-none"
                  onClick={handleAddTask}
                >
                  Add task
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-wrap -mx-3">
  {tasks.map((task) => (
    <div key={task._id} className="w-full md:w-1/2 lg:w-1/3 px-3 mb-6">
      <div className="bg-white rounded-lg shadow-md p-4 h-full flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{task.title}</h2>
          <p className="text-gray-600 overflow-hidden overflow-ellipsis" style={{ maxHeight: '3.6em' }}>{task.description}</p>
        </div>
        <div className="ml-auto">
                    <span
                      className={`text-xs text-white px-2 py-1 rounded-full ${task.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'}`}
                    >
                      {task.status}
                    </span>
                  </div>
        <div>
          <div className="flex items-center mt-4">
            <p className="text-gray-600">Priority:</p>
            <span className={`text-xs text-white px-2 py-1 rounded-full ml-2 ${priorityColors[task.priority]}`}>
              {task.priority}
            </span>
          </div>
          <div className="mt-4">
            <button
              className="bg-gray-800 text-white w-full py-2 px-4 border-2 border-gray-400 rounded-md shadow-md hover:bg-gray-100 focus:outline-none"
              onClick={() => handleUpdateTask(task)}
            >
              {task.status === 'completed' ? 'Mark not completed' : 'Mark completed'}
            </button>
          </div>
          <div className="mt-4">
            <button
              className="bg-red-600 text-white w-full py-2 px-4 border-2 border-gray-400 rounded-md shadow-md hover:bg-gray-100 focus:outline-none"
              onClick={() => handleDeleteTask(task._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

      </div>
    </div>
    </>
  );
};

const priorityColors = {
  high: 'bg-red-500',
  medium: 'bg-yellow-500',
  low: 'bg-green-500',
};

export default TaskPage;