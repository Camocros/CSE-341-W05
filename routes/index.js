const express = require('express');
const router = express.Router();
const passport = require('passport');

router.use('/users', require('./users'));
router.use('/projects', require('./projects'));
router.use('/skills', require('./skills'));
router.use('/experiences', require('./experiences'));

// OAuth login
router.get('/login', passport.authenticate('github', { scope: ['user:email'] }));

// OAuth callback
router.get('/github-callback', passport.authenticate('github', {
  failureRedirect: '/api-docs',
  session: true
}), (req, res) => {
  res.redirect('/api-docs');
});

// OAuth logout
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/api-docs');
  });
});

// Auth Status check helper
router.get('/auth-status', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ authenticated: true, user: req.user });
  } else {
    res.json({ authenticated: false });
  }
});

module.exports = router;
