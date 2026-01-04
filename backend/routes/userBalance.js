const express = require('express');
const UserBalance = require('../models/UserBalance');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user balance
router.get('/', auth, async (req, res) => {
  try {
    const userBalance = await UserBalance.findOne({ userId: req.user.userId });
    res.json({ customBalance: userBalance ? userBalance.customBalance : 0 });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user balance
router.put('/', auth, async (req, res) => {
  try {
    const { customBalance } = req.body;
    const userBalance = await UserBalance.findOneAndUpdate(
      { userId: req.user.userId },
      { customBalance, updatedAt: new Date() },
      { upsert: true, new: true }
    );
    res.json(userBalance);
  } catch (error) {
    res.status(400).json({ message: 'Error updating balance' });
  }
});

module.exports = router;