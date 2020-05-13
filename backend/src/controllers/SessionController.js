require('dotenv/config');
const crypto = require('crypto');

module.exports = {
  async create(req, res) {
    const { email, password } = req.body;

    try {
      // 1. Check if user exist

      const hashedPassword = await hash(password, 10);
      console.log(hashedPassword);

    } catch(err) {

    }
  }
}