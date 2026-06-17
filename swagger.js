const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Portfolio Builder API',
    description: 'API for CSE 341 Final Project Part 1',
  },
  host: 'cse-341-w05.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
