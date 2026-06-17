const mongodb = require('../database/connect');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Get all users'
  try {
    const result = await mongodb.getDb().db().collection('users').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Get a single user'
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid user id to find a user.');
      return;
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('users').find({ _id: userId });
    result.toArray().then((lists) => {
      if (lists.length === 0) {
        res.status(404).json('User not found');
        return;
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createUser = async (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Create a new user'
  try {
    const user = {
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    };
    if (!user.username || !user.firstName || !user.lastName || !user.email) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
    }
    const response = await mongodb.getDb().db().collection('users').insertOne(user);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the user.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Update an existing user'
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid user id to update a user.');
      return;
    }
    const userId = new ObjectId(req.params.id);
    const user = {
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('users')
      .replaceOne({ _id: userId }, user);
    if (response.matchedCount > 0) {
      res.status(200).json({ message: 'User updated successfully' });
    } else {
      res.status(404).json('User not found');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Delete a user'
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid user id to delete a user.');
      return;
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('users').deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json('User not found');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser
};
