const mongodb = require('../database/connect');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  // #swagger.tags = ['Skills']
  // #swagger.summary = 'Get all skills'
  try {
    const result = await mongodb.getDb().db().collection('skills').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  // #swagger.tags = ['Skills']
  // #swagger.summary = 'Get a single skill'
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid skill id to find a skill.');
      return;
    }
    const skillId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('skills').find({ _id: skillId });
    result.toArray().then((lists) => {
      if (lists.length === 0) {
        res.status(404).json('Skill not found');
        return;
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createSkill = async (req, res) => {
  // #swagger.tags = ['Skills']
  // #swagger.summary = 'Create a new skill'
  // #swagger.description = 'Requires authentication'
  // #swagger.security = [{ "GitHubOAuth": ["user:email"] }]
  try {
    const skill = {
      name: req.body.name,
      level: req.body.level,
      category: req.body.category
    };
    const response = await mongodb.getDb().db().collection('skills').insertOne(skill);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the skill.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateSkill = async (req, res) => {
  // #swagger.tags = ['Skills']
  // #swagger.summary = 'Update an existing skill'
  // #swagger.description = 'Requires authentication'
  // #swagger.security = [{ "GitHubOAuth": ["user:email"] }]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid skill id to update a skill.');
      return;
    }
    const skillId = new ObjectId(req.params.id);
    const skill = {
      name: req.body.name,
      level: req.body.level,
      category: req.body.category
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('skills')
      .replaceOne({ _id: skillId }, skill);
    if (response.matchedCount > 0) {
      res.status(200).json({ message: 'Skill updated successfully' });
    } else {
      res.status(404).json('Skill not found');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteSkill = async (req, res) => {
  // #swagger.tags = ['Skills']
  // #swagger.summary = 'Delete a skill'
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid skill id to delete a skill.');
      return;
    }
    const skillId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('skills').deleteOne({ _id: skillId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json('Skill not found');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createSkill,
  updateSkill,
  deleteSkill
};
