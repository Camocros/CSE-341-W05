const validateUser = (req, res, next) => {
  const { username, firstName, lastName, email } = req.body;
  if (!username || !firstName || !lastName || !email) {
    return res.status(400).json({ message: 'username, firstName, lastName, and email are required fields.' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }
  next();
};

const validateProject = (req, res, next) => {
  const { title, description, technology, projectUrl } = req.body;
  if (!title || !description || !technology || !projectUrl) {
    return res.status(400).json({ message: 'title, description, technology, and projectUrl are required fields.' });
  }
  next();
};

const validateSkill = (req, res, next) => {
  const { name, level, category } = req.body;
  if (!name || !level || !category) {
    return res.status(400).json({ message: 'name, level, and category are required fields.' });
  }
  next();
};

const validateExperience = (req, res, next) => {
  const { company, role, startDate, endDate, description } = req.body;
  if (!company || !role || !startDate || !endDate || !description) {
    return res.status(400).json({ message: 'company, role, startDate, endDate, and description are required fields.' });
  }
  next();
};

module.exports = {
  validateUser,
  validateProject,
  validateSkill,
  validateExperience
};
