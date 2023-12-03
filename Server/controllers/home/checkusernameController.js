import userData from "../../models/userData.js";

const checkusername = async (req, res) => {
  try {

    const result = await userData.findOne({ username: req.params.value });
    
    if (result) {
      res.status(200).send({ available: false, message: "Not Available!"});
    }
    else {
      res.status(200).send({ available: true, message: "Available!" });
    }
  }
  catch (err) {
    res.status(500).send({ available: false, message: "Couldn't find. Got error." });
  }
}

export { checkusername };