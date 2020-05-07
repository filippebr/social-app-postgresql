const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
  async index (req, res) {
    const screams = await connection('screams')
      .select('*')
      .orderBy('created_at', 'desc');

    return res.json(screams);
  },

  async create(req, res, next) {
    try {
     
      const { user_handle, body } = req.body;

      const id = crypto.randomBytes(4).toString('HEX');
  
      const newScream = {
        id,
        user_handle,
        body
      }
  
      await connection('screams').insert(newScream);
      
      return res.status(201).send();
    } catch(error) {
      next(error);
    }
    
  }
};