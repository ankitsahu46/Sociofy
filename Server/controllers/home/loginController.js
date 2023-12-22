import userData from "../../models/userData.js";
import Jwt from 'jsonwebtoken';

const login = async (req, res) => {
  try {
    const result = await userData.findOne({
      password: req.body.password,
      $or: [
        {email: req.body.email},
        {username: req.body.email}
      ]
    }).select({posts: 0});
    
    const email = result.email;

    Jwt.sign({ email }, process.env.JWT_KEY, (err, token) => {
      if (err) {
        res.status(500).send({ success: false, message: "Something went wrong" });
      }
      else if (result) {
        res.status(200).send({ success: true, result: result, auth: token, message: "login Successful."})
      }
      else {
        res.status(404).send({ success: false, massage: "Can't find user."});
      }
    })
  }
  catch (err) {
    res.status(500).send({ success: false, message: "Couldn't Login. Please try Again."});
  }
}

export { login };