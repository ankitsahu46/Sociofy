import userData from "../../models/userData.js";

const getUserProfileInfoNoPost = async (req, res) => {
  const result = await userData.findOne({ _id: req.params.user_id });

  if (result) res.status(200).send({ success: true, userData: result });
  else res.status(404).send({ success: false, message: 'User not found' });
}

export { getUserProfileInfoNoPost };