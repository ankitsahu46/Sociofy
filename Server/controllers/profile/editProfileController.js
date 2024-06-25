import userData from "../../models/userData.js";

const editProfile = async (req, res) => {
  const { user_id } = req.params;
  const { name, username, email, bio } = req.body;
  try {
    const result = await userData.findOneAndUpdate(
      { _id: user_id },
      { 
        $set: {
          name: name,
          username: username,
          email: email,
          bio: bio,
        }
      },
      { new: true}
    )
    
    if (result) res.status(200).json({ success: true, profileData:result, message: "Details changed successfully." });
    else res.status(404).json({ success: false, message: "Couldn't find user!" });
  }
  catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export { editProfile };
