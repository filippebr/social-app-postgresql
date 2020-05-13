require('dotenv/config');
const express = require('express');
const routes = require('./routes');
const cookieParser = require('cookie-Parser');
const cors = require('cors');

const app = express();

//New
app.use(cookieParser());
app.use(cors());

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); // support URL-encoded bodies                                             
app.use(routes);

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ error: error.message });
});

app.listen(3333);