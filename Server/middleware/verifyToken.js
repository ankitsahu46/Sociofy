import Jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
  let token = req.headers['authorization'];
  if (!token) token = req.body.token;

  if (token) {
    Jwt.verify(token, process.env.JWT_KEY, (err, valid) => {
      if (err) {
        res.status(401).send({success: false, message: 'Please provide valid token.'});
      }
      else next();
    })
  }
  else {
    res.status(403).send({sucess: false, message: 'Please add token with the header.'})
  }
}

export default verifyToken;