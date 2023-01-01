const express = require('express');
const databaseConfig = require('./config/database');
const expressConfig = require('./config/express');
const routesConfig = require('./config/routes');


start();
async function start() {
  const app = express();
  const port = 3000;

  await databaseConfig(app);
  expressConfig(app);
  routesConfig(app);

  app.listen(port, () => console.log(`Server listening on port ${port}...`));
}