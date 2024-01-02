import userData from "../../models/userData.js";

const getUserProfileData = async (req, res) => {
  const result = await userData.findOne({ username: req.params.username });

  console.log(result, "result 77");
  if (result) res.status(200).send({ success: true, result: result });
  else res.status(404).send({ success: false, message: 'User not found' });
}

export { getUserProfileData };