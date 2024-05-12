const Task = require('../models/Task');
const Board = require('../models/Board');

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const boardId = req.params.boardId;

    // Create new task
    const newTask = new Task({
      title,
      description,
      dueDate,
      board: boardId,
    });

    // Save task to database
    const savedTask = await newTask.save();

    // Add task to board's tasks array
    const board = await Board.findById(boardId);
    board.tasks.push(savedTask._id);
    await board.save();

    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all tasks for a board
exports.getBoardTasks = async (req, res) => {
  try {
    const boardId = req.params.boardId;

    // Find all tasks for the board
    const tasks = await Task.find({ board: boardId });

    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description, dueDate, completed } = req.body;

    // Update task
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, dueDate, completed },
      { new: true }
    );

    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const boardId = req.params.boardId;

    // Delete task from database
    await Task.findByIdAndDelete(taskId);

    // Remove task from board's tasks array
    const board = await Board.findById(boardId);
    board.tasks = board.tasks.filter((task) => task.toString() !== taskId);
    await board.save();

    res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};