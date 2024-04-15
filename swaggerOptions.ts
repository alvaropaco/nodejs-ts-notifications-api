import { Application } from 'express';

// Swagger definitions
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Notification API',
    version: '1.0.0',
    description: 'This is a simple API for notification management',
    contact: {
      name: 'Developer',
      email: 'developer@example.com'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local server'
    }
  ]
};

const options = {
  swaggerDefinition,
  // Path to the API docs
  apis: ['./src/routes/*.ts'] // Adjust this path as necessary.
};

export function setupSwagger(app: Application): void {
  const swaggerSpec = require('swagger-jsdoc')(options);
  const swaggerUi = require('swagger-ui-express');
  
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
