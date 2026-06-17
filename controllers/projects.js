const mongodb = require('../database/connect');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('projects').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid project id to find a project.');
      return;
    }
    const projectId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('projects').find({ _id: projectId });
    result.toArray().then((lists) => {
      if (lists.length === 0) {
        res.status(404).json('Project not found');
        return;
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createProject = async (req, res) => {
  try {
    const project = {
      title: req.body.title,
      description: req.body.description,
      technology: req.body.technology,
      projectUrl: req.body.projectUrl
    };
    if (!project.title || !project.description || !project.technology || !project.projectUrl) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
    }
    const response = await mongodb.getDb().db().collection('projects').insertOne(project);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the project.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProject = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid project id to update a project.');
      return;
    }
    const projectId = new ObjectId(req.params.id);
    const project = {
      title: req.body.title,
      description: req.body.description,
      technology: req.body.technology,
      projectUrl: req.body.projectUrl
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('projects')
      .replaceOne({ _id: projectId }, project);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json('Project not found');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid project id to delete a project.');
      return;
    }
    const projectId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('projects').deleteOne({ _id: projectId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json('Project not found');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createProject,
  updateProject,
  deleteProject
};
