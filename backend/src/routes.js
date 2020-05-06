const express = require('express');
const crypto = require('crypto');
const connection = require('./database/connection');

const routes = express.Router();

routes.post('/screams', async (req, res) => {
  const { user_handle, body } = req.body;

  const id = crypto.randomBytes(4).toString('HEX');

  await connection('screams').insert({
    id, 
    user_handle,
    body
  })

  return res.json({ id });
});

module.exports = routes;