const express = require('express');
const Person = require('../models/Person');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all people for user
router.get('/', auth, async (req, res) => {
  try {
    const people = await Person.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(people);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add new person
router.post('/', auth, async (req, res) => {
  try {
    const { name, relation, mobile } = req.body;
    
    const person = new Person({
      name,
      relation,
      mobile,
      userId: req.user.id
    });

    await person.save();
    res.status(201).json(person);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete person
router.delete('/:id', auth, async (req, res) => {
  try {
    const person = await Person.findOne({ _id: req.params.id, userId: req.user.id });
    
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }

    await Person.findByIdAndDelete(req.params.id);
    res.json({ message: 'Person deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update person
router.put('/:id', auth, async (req, res) => {
  try {
    const person = await Person.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json(person);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;