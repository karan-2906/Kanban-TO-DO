import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import boards from '../data'; // Import static boards data

const url = process.env.REACT_APP_API_BASE_URL;


function Board() {
  const { boardId } = useParams();
  const [board, setBoard] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');

  useEffect(() => {
  const foundBoard = boards.find((b) => b._id === boardId);
    if (foundBoard) {
      setBoard(foundBoard);
      setTasks(foundBoard.tasks);
    } else {
      fetchBoard();
      fetchTasks();
    }
  }, [boardId]);

  const fetchBoard = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${url}/boards/${boardId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBoard(response.data);
      console.log(response.data)
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${url}/tasks/${boardId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const createTask = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${url}/tasks/${boardId}`,
        {
          title: newTaskTitle,
          description: newTaskDescription,
          dueDate: newTaskDueDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewTaskTitle('');
      setNewTaskDescription('');
      setNewTaskDueDate('');
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleTaskCompleted = async (taskId, completed) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${url}/tasks/${taskId}`,
        { completed: !completed },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${url}/tasks/${taskId}/${boardId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTasks();
    } catch (err) {
      console.error(err); 
    }
  };

  return (
    <div className="container mx-auto py-8">
      {board && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Board Name: {board.name}</h2>
          <div className="mb-4 flex">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
              type="text"
              placeholder="New task title"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
            />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
              type="text"
              placeholder="New task description"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
            />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
              type="date"
              value={newTaskDueDate}
              onChange={(e) => setNewTaskDueDate(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/5"
              onClick={createTask}
            >
              Create Task
            </button>
          </div>
          <ul>
            <div className='flex flex-col gap-4'>
            {tasks.map((task) => (
              <div className='bg-gray-300 px-4 py-2 rounded-full'>
              <li
                key={task._id}
                className="mb-2 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompleted(task._id, task.completed)}
                    className="mr-2 rounded-full"
                  />
                  <span
                    className={`${
                      task.completed ? 'line-through text-gray-500' : ''
                    }`}
                  >
                    {task.title}
                  </span>
                </div>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </button>
              </li>
            </div>
            ))}
            </div>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Board;