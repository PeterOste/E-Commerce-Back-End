const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection'); // Imported Sequelize

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Turn on routes
app.use(routes);

// Synced Sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});