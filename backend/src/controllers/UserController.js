const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
  async index(req, res) {
    const results = await connection('users');

    return res.json(results);
  },

  async create(req, res, next) {
    try {
      const { email, password, user_handle } = req.body;

      const id = crypto.randomBytes(4).toString('HEX');

      const query = connection('users');

      // Check if the user already exist 
      if ( email && password && user_handle ) {
        query.where({ email });      
      } 

      const hashedPassword = await hash(password, 10);

      const newUser = {
        id,
        email,
        password: hashedPassword,
        user_handle
      }
      
      await connection('users').insert(newUser);
  
      return res.status(201).send({ message: 'User Created' });           

    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { user_handle } = req.body;
      const { id } = req.params;

      await connection('users')
        .update({ user_handle })
        .where({ id })

      return res.send();

    } catch (error) {
      next(error);
    }
  },
  
  async delete(req, res, next) {
    try {
      const { id } = req.params;

      await connection('users')
        .where({ id })
        .del();

      return res.send()
    } catch (error) {
      next(error);
    }
  }
}