import userData from "../../models/userData.js";

const getUserNameAndUserImg = async (req, res) => {
  const result = await userData.findOne({ _id: req.params.user_id }).select('username img');

  if (result) res.status(200).send({ success: true, userInfo: result });
  else res.status(404).send({ success: false, message: 'User not found' });
}

export { getUserNameAndUserImg };