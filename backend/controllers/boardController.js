const Board = require('../models/Board');
const User = require('../models/User');

// Create a new board
exports.createBoard = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.userId;

    // Create new board
    const newBoard = new Board({
      name,
      user: userId,
    });

    // Save board to database
    const savedBoard = await newBoard.save();

    // Add board to user's boards array
    const user = await User.findById(userId);
    user.boards.push(savedBoard._id);
    await user.save();

    res.status(201).json(savedBoard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all boards for a user
exports.getUserBoards = async (req, res) => {
  try {
    const userId = req.userId;

    // Find all boards for the user
    const boards = await Board.find({ user: userId }).populate('tasks');

    res.status(200).json(boards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a board by its ID
exports.getBoardById = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }
    res.json(board);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update a board
exports.updateBoard = async (req, res) => {
  try {
    const boardId = req.params.id;
    const { name } = req.body;

    // Update board
    const updatedBoard = await Board.findByIdAndUpdate(
      boardId,
      { name },
      { new: true }
    );

    res.status(200).json(updatedBoard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a board
exports.deleteBoard = async (req, res) => {
  try {
    const boardId = req.params.id;
    const userId = req.userId;

    // Delete board from database
    await Board.findByIdAndDelete(boardId);

    // Remove board from user's boards array
    const user = await User.findById(userId);
    user.boards = user.boards.filter((board) => board.toString() !== boardId);
    await user.save();

    res.status(200).json({ message: 'Board deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};