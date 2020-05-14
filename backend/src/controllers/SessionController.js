require('dotenv/config');
const connection = require('../database/connection');
const { hash, compare } = require('bcryptjs');

module.exports = {
  async register(req, res) {
    const { email, password } = req.body;

    try {
      // 1. Check if user exist
      const user = connection('users').find(user => user.email === email);

      const hashedPassword = await hash(password, 10);
      console.log(hashedPassword);

    } catch(err) {

    }
  }
}