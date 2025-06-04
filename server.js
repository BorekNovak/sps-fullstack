const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


const apiRoutes = require('./api/api');
app.use('/api', apiRoutes); // /api/items

app.listen(3000, () => {
  console.log('Server běží na http://localhost:3000');
});
