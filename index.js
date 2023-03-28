// importing request, mongodb settings and routes
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
// port is flexible for heroku or localhost
const PORT = process.env.PORT || 3001;
// setting up express
const app = express(); 
// telling express what to use
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
// once mongodb is connected, set up server, console log
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
