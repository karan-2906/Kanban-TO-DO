const express = require('express');
const router = express.Router();
const {
  createTask,
  getBoardTasks,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const auth = require('../middleware/auth');

// Create a new task
router.post('/:boardId', auth, createTask);

// Get all tasks for a board
router.get('/:boardId', auth, getBoardTasks);

// Update a task
router.put('/:id', auth, updateTask);

// Delete a task
router.delete('/:id/:boardId', auth, deleteTask);

module.exports = router;