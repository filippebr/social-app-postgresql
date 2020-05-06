const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
  async index (req, res) {
    const screams = await connection('screams').select('*');
  
    return res.json(screams);
  },

  async create(req, res) {
    const { user_handle, body } = req.body;

    const id = crypto.randomBytes(4).toString('HEX');

    const newScream = {
      id,
      user_handle,
      body
    }

    await connection('screams')
    .insert(newScream)
    .then(() => {
      res.json({ message: `Document ${id} created successfully` });
    })
    .catch(err => {
      res.status(500).json({ error: 'Something went wrong'});
      console.error(err);
    })
  }
};