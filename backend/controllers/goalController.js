// mongoose methods return promise so need async function
// async-await need try-catch (instead of .then), we can use express-async-handler
const asyncHandler = require('express-async-handler');

const Goal = require('../models/goalModel');
const User = require('../models/userModel');

// @desc    Get goals
// @route   GET /api/goals
// @access  Private (after auth)
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });

  res.status(200).json(goals);
  //   res.send('GET Goals...');
});

// @desc    Set goal
// @route   POST /api/goals
// @access  Private (after auth)
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add text...');
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(goal);
});

// @desc    Update goals
// @route   PUT /api/goals/:id
// @access  Private (after auth)
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Err('Goal not found');
  }

  // Check user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Match logged in user to goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);

  // res.status(200).json({ message: `PUT, Update Goal ${req.params.id}...` });
});

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private (after auth)
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Err('Goal not found');
  }

  // Check user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Match logged in user to goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  // await goal.remove();
  await Goal.findByIdAndRemove(req.params.id);

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
