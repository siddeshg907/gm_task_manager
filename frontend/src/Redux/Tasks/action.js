import axios from 'axios';

export const fetchTasks = (token, userID) => {
  return async (dispatch) => {
    dispatch({ type: 'FETCH_TASKS_REQUEST' });
    try {
      const response = await axios.get("https://good-shoe-cow.cyclic.app/tasks", {
        headers: {
          Authorization: token,
          userID: userID,
        },
      });
      const tasks = response.data.filter(task => task.userID === userID);
      dispatch({ type: 'FETCH_TASKS_SUCCESS', payload: tasks });
    } catch (error) {
      dispatch({ type: 'FETCH_TASKS_FAILURE', payload: error.message });
      console.error("Error fetching tasks:", error);
    }
  };
};

export const addTask = (newTask, token, userID) => {
  return async (dispatch) => {
    dispatch({ type: 'ADD_TASK_REQUEST' });
    try {
      const response = await axios.post('https://good-shoe-cow.cyclic.app/tasks/add', newTask, {
        headers: {
          Authorization: token,
          userID: userID,
        },
      });
      dispatch({ type: 'ADD_TASK_SUCCESS', payload: response.data });
      dispatch(fetchTasks(token, userID)); // Fetch updated tasks after adding new task
    } catch (error) {
      dispatch({ type: 'ADD_TASK_FAILURE', payload: error.message });
      console.error(error.message);
    }
  };
};

export const updateTask = (task, token, userID) => {
  return async (dispatch) => {
    try {
      const updatedTask = {
        ...task,
        status: task.status === 'completed' ? 'not completed' : 'completed',
      };
      await axios.patch(`https://good-shoe-cow.cyclic.app/tasks/update/${task._id}`, updatedTask, {
        headers: {
          Authorization: token,
          userID: userID,
        },
      });
      dispatch({ type: 'UPDATE_TASK_SUCCESS', payload: updatedTask });
    } catch (error) {
      console.error(error.message);
    }
  };
};

export const deleteTask = (taskId, token, userID) => {
  return async (dispatch) => {
    try {
      await axios.delete(`https://good-shoe-cow.cyclic.app/tasks/delete/${taskId}`, {
        headers: {
          Authorization: token,
          userID: userID,
        },
      });
      dispatch({ type: 'DELETE_TASK_SUCCESS', payload: taskId });
    } catch (error) {
      console.error(error.message);
    }
  };
};