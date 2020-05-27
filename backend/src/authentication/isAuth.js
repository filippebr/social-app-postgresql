const { verify } = require('jsonwebtoken');

const isAuth = (req, res) => {
  const authorization = req.header['authorization'];
  
  // 'Bearer dsfnsaçnrepwçanrçen13l25n2ç'
  const token = authorization.split(' ')[1];

  const { userId } = verify(token, process.env.ACCESS_TOKEN_SECRET);

  return userId;
}

exports.default = isAuth;