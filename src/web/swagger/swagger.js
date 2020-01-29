const router = require('express').Router();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  info: {
    title: 'Desafio Software Engineer, Back-end - Pagar.me',
    version: '1.0.0',
  },
  securityDefinitions: {
    auth: {
      in: 'header',
      name: 'api_key',
      type: 'apiKey',
    },
  },
};

const options = {
  swaggerDefinition,
  // the first element of the array is the request models and the second is the response models
  apis: ['./src/web/routes/**/*.js', './src/domain/**/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

router.use('/1/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;
