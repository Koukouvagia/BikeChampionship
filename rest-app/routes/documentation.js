const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const yaml = require('yamljs');

const yamlDocs = fs.readFileSync(path.join(__dirname, '..', 'documentation.yaml'), { encoding: 'utf8' });
const docs = yaml.parse(yamlDocs);

router.use('/', swaggerUi.serve);

router.get('/', swaggerUi.setup(docs));

module.exports = router;