const express = require('express');
const Portfolio = require('../models/Portfolio');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all portfolio items for user
router.get('/', auth, async (req, res) => {
  try {
    const portfolioItems = await Portfolio.find({ userId: req.user.userId });
    res.json(portfolioItems);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add new portfolio item
router.post('/', auth, async (req, res) => {
  try {
    const portfolioItem = new Portfolio({
      ...req.body,
      userId: req.user.userId
    });
    await portfolioItem.save();
    res.status(201).json(portfolioItem);
  } catch (error) {
    res.status(400).json({ message: 'Error creating portfolio item' });
  }
});

// Delete portfolio item
router.delete('/:id', auth, async (req, res) => {
  try {
    await Portfolio.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    res.json({ message: 'Portfolio item deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;