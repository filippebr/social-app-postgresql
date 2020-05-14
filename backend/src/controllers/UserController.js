const crypto = require('crypto');
const { hash, compare, genSalt } = require('bcryptjs');
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

      const saltRounds = 10;
      const salt = await genSalt(saltRounds);
      const hashedPassword = await hash(password, salt);

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