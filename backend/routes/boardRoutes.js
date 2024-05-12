const express = require('express');
const router = express.Router();
const {
  createBoard,
  getUserBoards,
  updateBoard,
  deleteBoard,
  getBoardById
} = require('../controllers/boardController');
const auth = require('../middleware/auth');

// Create a new board
router.post('/', auth, createBoard);

// Get all boards for a user
router.get('/', auth, getUserBoards);

// Get a board by its ID
router.get('/:id', auth, getBoardById);

// Update a board
router.put('/:id', auth, updateBoard);

// Delete a board
router.delete('/:id', auth, deleteBoard);

module.exports = router;