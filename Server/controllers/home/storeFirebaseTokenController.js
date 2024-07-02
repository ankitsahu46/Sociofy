import userData from "../../models/userData.js";

const storeFirebaseToken = async (req, res) => {
  const { user_id } = req.params;
  const { firebaseToken } = req.body;

  try {
    let result = await userData.findOneAndUpdate(
      { _id: user_id },
      { $set: { firebaseToken } }
    );
    if (result) {
      res
        .status(200)
        .send({ success: true, message: "Token stored successfully." });
    } else {
      // User not found
      res.status(404).send({ success: false, message: "User not found." });
    }
  } catch (err) {
    res
      .status(500)
      .send({ success: false, message: "Couldn't store firebase token" });
  }
};

export { storeFirebaseToken };
