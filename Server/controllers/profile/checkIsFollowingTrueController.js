import userData from "../../models/userData.js";

const checkIsFollowingTrue = async (req, res) => {
  const { who_followed: whoFollowed, user_id: followedToWhom } = req.params;

  try {
    const result = await userData.findOne({ _id: whoFollowed, following: followedToWhom })

    if (result) res.status(200).json({ success: true, message: "Yes, you are following the user." });
    else res.status(200).json({ success: false, message: "No, you are not following the user" });
  }
  catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export { checkIsFollowingTrue };
