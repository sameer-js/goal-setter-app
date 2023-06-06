// mongoose methods return promise so need async function
// async-await need try-catch (instead of .then), we can use express-async-handler
const asyncHandler = require('express-async-handler');

// @desc    Get goals
// @route   GET /api/goals
// @access  Private (after auth)
const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'GET Goals...' });
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

  res.status(200).json({ message: 'POST, Create Goal...' });
});

// @desc    Update goals
// @route   PUT /api/goals/:id
// @access  Private (after auth)
const updateGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `PUT, Update Goal ${req.params.id}...` });
});

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private (after auth)
const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `DELETE Goal ${req.params.id}...` });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
