import { getMessaging } from "firebase-admin/messaging";
import userData from "../../models/userData.js";

const fcm = async (req, res) => {
  const { title, body, userId } = req.body;

  //retrieving the firebase token
  const result = await userData
    .findOne({ _id: userId })
    .select("firebaseToken -_id");

  if (result && result.firebaseToken) {
    const { firebaseToken } = result;
    const message = {
      notification: { title, body },
      token: firebaseToken,
    };

    getMessaging()
      .send(message)
      .then((response) => {
        res.status(200).json({
          success: true,
          message: "Successfully sent message",
          token: firebaseToken,
        });
      })
      .catch((error) => {
        res.status(500).json({ success: false, message: error });
      });
  }
};

export { fcm };
