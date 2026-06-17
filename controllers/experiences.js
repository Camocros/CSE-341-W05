const mongodb = require('../database/connect');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  // #swagger.tags = ['Experiences']
  // #swagger.summary = 'Get all experiences'
  try {
    const result = await mongodb.getDb().db().collection('experiences').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  // #swagger.tags = ['Experiences']
  // #swagger.summary = 'Get a single experience'
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid experience id to find an experience.');
      return;
    }
    const experienceId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('experiences').find({ _id: experienceId });
    result.toArray().then((lists) => {
      if (lists.length === 0) {
        res.status(404).json('Experience not found');
        return;
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createExperience = async (req, res) => {
  // #swagger.tags = ['Experiences']
  // #swagger.summary = 'Create a new experience'
  try {
    const experience = {
      company: req.body.company,
      role: req.body.role,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      description: req.body.description
    };
    const response = await mongodb.getDb().db().collection('experiences').insertOne(experience);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the experience.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateExperience = async (req, res) => {
  // #swagger.tags = ['Experiences']
  // #swagger.summary = 'Update an existing experience'
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid experience id to update an experience.');
      return;
    }
    const experienceId = new ObjectId(req.params.id);
    const experience = {
      company: req.body.company,
      role: req.body.role,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      description: req.body.description
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('experiences')
      .replaceOne({ _id: experienceId }, experience);
    if (response.matchedCount > 0) {
      res.status(200).json({ message: 'Experience updated successfully' });
    } else {
      res.status(404).json('Experience not found');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteExperience = async (req, res) => {
  // #swagger.tags = ['Experiences']
  // #swagger.summary = 'Delete an experience'
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid experience id to delete an experience.');
      return;
    }
    const experienceId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('experiences').deleteOne({ _id: experienceId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json('Experience not found');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createExperience,
  updateExperience,
  deleteExperience
};
