import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import boards from '../data'; // Import static boards data

const url = process.env.REACT_APP_API_BASE_URL;


function Boards() {
  const [userBoards, setUserBoards] = useState(boards); // Initialize with static boards data
  const [newBoardName, setNewBoardName] = useState('');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [selectedBoardId, setSelectedBoardId] = useState(null);

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${url}/boards`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserBoards(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const createBoard = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${url}/boards`,
        { name: newBoardName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewBoardName('');
      fetchBoards();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddTask = (boardId) => {
    setSelectedBoardId(boardId);
    setShowTaskForm(true);
  };

  const createTask = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${url}/tasks/${selectedBoardId}`,
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
      setShowTaskForm(false);
      fetchBoards();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Boards</h2>
      <div className="mb-4 flex ">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
          type="text"
          placeholder="New board name"
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/5"
          onClick={createBoard}
        >
          Create Board
        </button>
      </div>
      <ul>
        <div className='flex gap-5'>
          {userBoards.map((board) => (
            <li key={board._id} className="mb-2 flex w-1/5 items-center justify-between text-xl">
              <div className=' flex flex-col w-full items-center text-center'>
                <Link
                  to={`/boards/${board._id}`}
                  className=" font-bold py-2 px-4 rounded flex justify-center items-center bg-gray-200 hover:bg-gray-300 text-gray-800 w-full"
                >
                  <span>{board.name}</span>
                </Link>
              
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
                onClick={() => handleAddTask(board._id)}
              >
                Add Task
              </button>
              </div>
            </li>
          ))}
        </div>
      </ul>
      {showTaskForm && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Add Task</h3>
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
              type="text"
              placeholder="Task title"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Task description"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="date"
              value={newTaskDueDate}
              onChange={(e) => setNewTaskDueDate(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={createTask}
            >
              Create Task
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Boards;