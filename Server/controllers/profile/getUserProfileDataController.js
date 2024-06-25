import userData from "../../models/userData.js";

const getUserProfileData = async (req, res) => {
  const result = await userData.findOne({ _id: req.params.user_id }).populate('posts').exec();

  if (result) res.status(200).send({ success: true, profileData: result });
  else res.status(404).send({ success: false, message: 'User not found' });
}

export { getUserProfileData };