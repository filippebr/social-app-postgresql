require('dotenv').config();
const { 
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken
} = require('../tokens/tokens');
const { hash, compare } = require('bcryptjs');
const { isAuth } = require('../authentication/isAuth');

const connection = require('../database/connection');

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

  async login(req, res, next) {
      
    const { email, password } = req.body;

    try {
      //const user = await connection.raw("SELECT * FROM users WHERE email = ?", [email]);
      // Find user in "database". If not exist send error 
      const user = await connection('users').where({ email });
      
      // if (!user) throw new Error("User does not exist");

      // Compare crypted password and see if it checks out. Send error if not
      const valid = await compare(password, user[0].password);

      // if (!valid) throw new Error("Password not correct");

      // Create Refresh and Accesstoken      
      const accesstoken = createAccessToken(user[0]);
      const refreshtoken = createRefreshToken(user[0]);      

      // console.log(accesstoken);
      // console.log(refreshtoken);
      // console.log(user[0]);

      // Put the refreshtoken in the "database"
      user[0].refreshtoken = refreshtoken;
      
      // Send token. Refreshtoken as a cookie and accesstoken as regular response
      sendRefreshToken(res, refreshtoken);
      sendAccessToken(res, req, accesstoken);

      // return res.json(user);       
      
    } catch(error) {
      next(error);
    }    
  }, 

  // Logout the user, use _req because never will be used
  async logout(_req, res, next) {
    try {
      res.clearCookie('refreshtoken');

      return res.json({
        message: 'Logged out'
      });

    } catch(error) {
      next(error);
    }    
  },

  // Protected route
  async protected(req, res, next) {
    try {
      const userId = isAuth(req);

      if ( userId !== null ) {
        return res.json({
          data: 'This is protected data.'
        });
      }
    } catch(error) {
      console.log("protected");
      next(error);
    }
  }

}

 