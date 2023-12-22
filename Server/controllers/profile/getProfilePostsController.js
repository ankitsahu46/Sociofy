import userData from "../../models/userData.js";

const getProfilePosts = async (req, res) => {
  const result = await userData.findOne({email: req.params.email, username: req.params.username});

  if (result && result.posts.length > 0) res.status(200).send({ success: true, result: result.posts })
  else res.status(404).send({ success: false, message: "No Post Available!"});
};

export { getProfilePosts };
