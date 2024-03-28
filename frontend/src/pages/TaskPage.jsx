import React, { useState, useEffect } from 'react';

import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, fetchTasks, updateTask } from '../Redux/Tasks/action';


const TaskPage = () => {
const dispatch = useDispatch();
const tasks = useSelector(state => state.tasks.tasks);
const userID = localStorage.getItem('userID');
const token = localStorage.getItem('token');
const [newTask, setNewTask] = useState({
  title: '',
  description: '',
  status: 'not completed',
  priority: 'medium',
  userID: userID || ''
});
const [showForm, setShowForm] = useState(false);

useEffect(() => {
  dispatch(fetchTasks(token, userID))
}, [dispatch, token, userID]);



const handleChange = (e) => {
  setNewTask({ ...newTask, [e.target.name]: e.target.value });
};

const handleAddTask = () => {
  dispatch(addTask(newTask, token, userID));
  setNewTask({
    title: '',
    description: '',
    status: 'not completed',
    priority: 'medium',
    userID: userID
  });
};

const handleUpdateTask = (task) => {
  dispatch(updateTask(task, token, userID));
};

const handleDeleteTask = (taskId) => {
  dispatch(deleteTask(taskId, token, userID));
};

  return (
    <>
      <Navbar />
      
      <div className="flex flex-col justify-center items-center">
        <div className="w-full max-w-2xl p-4">
          <div className="flex justify-center">
            <h1 className="text-3xl font-bold text-grey-500">Tasks</h1>
          </div>
          <hr className="mt-2 mb-6 border-gray-300" />
          <button
            className="font-bold text-teal-500 w-full py-2 mb-6 border-2 border-gray-400 rounded-md shadow-md hover:bg-gray-100 focus:outline-none"
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
                  <label htmlFor="priority" className="block text-sm font-semibold text-gray-700">
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
                    className="w-full py-2 px-4 border-2 border-gray-400 bg-gray-800 text-white rounded-md shadow-md hover:bg-gray-100 focus:outline-none"
                    onClick={handleAddTask}
                  >
                    Add task
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="flex flex-wrap -mx-3">
            {tasks && tasks.map((task) => (
              <div key={task._id} className="w-full md:w-1/2 lg:w-1/3 px-3 mb-6">
                <div className="bg-white rounded-lg shadow-md p-4 h-full flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-blue-500">{task.title}</h2>
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
                      <p className="text-gray-600 font-bold">Priority:</p>
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