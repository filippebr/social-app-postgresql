require('dotenv/config');
const connection = require('../database/connection');
const { hash, compare } = require('bcryptjs');

module.exports = {
  async register(req, res, next) {
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

  async signin(req, res, next) {
      
    const { email, password } = req.body;

    try {
      //const user = await connection.raw("SELECT * FROM users WHERE email = ?", [email]);
      // Find user in "database". If not exist send error 
      const user = await connection('users').where({email});
      
      if (!user) throw new Error("User does not exist");

      // Compare crypted password and see if it checks out. Send error if not
      const valid = await compare(password, user.password);

      if (!valid) throw new Error ("Password not correct");

      
      
      return res.json(user);
       
      
    } catch(error) {
      next(error);
    }    
  }
 }