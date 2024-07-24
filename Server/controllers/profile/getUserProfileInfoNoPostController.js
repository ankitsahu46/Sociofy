import userData from "../../models/userData.js";

const getUserProfileInfoNoPost = async (req, res) => {
  try {
    const result = await userData.findOne({ _id: req.params.user_id });

    if (result) res.status(200).send({ success: true, userData: result });
    else res.status(404).send({ success: false, message: "User not found" });
  } catch (err) {
    res.status(500).send({ success: false, message: "Get error: " + err });
  }
};

export { getUserProfileInfoNoPost };
