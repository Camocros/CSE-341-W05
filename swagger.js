const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Portfolio Builder API',
    description: 'API for CSE 341 Final Project Part 2 (CRUD, OAuth, and Validation)',
    version: '1.0.0'
  },
  host: 'cse-341-w05.onrender.com',
  schemes: ['https'],
  securityDefinitions: {
    GitHubOAuth: {
      type: 'oauth2',
      authorizationUrl: 'https://github.com/login/oauth/authorize',
      flow: 'implicit',
      scopes: {
        'user:email': 'Access user profile and email'
      }
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
