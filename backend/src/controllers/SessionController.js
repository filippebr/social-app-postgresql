require('dotenv/config');
const connection = require('../database/connection');
const { hash, compare } = require('bcryptjs');

module.exports = {
  async register(req, res) {
    try {
      const { email, password, user_handle } = req.body;

      // Create a random id
      const id = crypto.randomBytes(4).toString('HEX');

      // Create password with salt
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

  async signin(req, res) {
    try {
      const { email } = req.body;

      //const user = await connection.raw("SELECT * FROM users WHERE email = ?", [email]);
      const user = await connection('users').where({email});
  
      if ( user ) {
        return res.json(user);
      }
    } catch(err) {
      next(error);
    }    
  }
 }