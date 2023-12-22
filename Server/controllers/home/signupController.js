import userData from "../../models/userData.js";
import Jwt from 'jsonwebtoken';

const signup = async (req, res) => {

  try {
    let result = await userData(req.body);
    result = await result.save();
    const email = result.email;

    Jwt.sign({ email }, process.env.JWT_KEY, (err, token) => {
      if (err) {
        res.status(500).send({ success: false, massage: "Something went wrong" });
      }
      res.status(200).send({ success: true, result: result, auth: token, message: "Signup successful."})
    })
  }
  catch (err) {
    res.status(500).send({ success: false, message: "Couldn't sign up."});
  }
}

export { signup };