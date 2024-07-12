import notificationData from "../../models/notificationData.js";

const sendToNotificationData = async (req, res) => {
  const {
    category,
    gotByUserId,
    gotByUserName,
    gotByUserProfileImg,
    userId,
    body,
    otherData = {},
  } = req.body;

  try {
    let result;
    const notificationDetails = {
      category,
      gotByUserId,
      gotByUserName,
      gotByUserProfileImg,
      userId,
      body,
      date: Date.now(),
    };

    if (category === "Likes Post") {
      result = await notificationData.findOneAndUpdate(
        {
          category,
          userId,
          gotByUserId,
          "otherData.postId": otherData?.postId,
        },
        {
          ...notificationDetails,
          otherData,
        },
        { upsert: true, new: true }
      );
    } else if (category === "Comments on Post") {
      result = new notificationData({
        ...notificationDetails,
        otherData,
      });
      result = await result.save();
      
    } else if (category === "Starts Following") {
      result = await notificationData.findOneAndUpdate(
        { category, userId, gotByUserId },
        notificationDetails,
        { upsert: true, new: true }
      );
    }

    if (result) {
      res.status(200).send({
        success: true,
        data: result,
        message: "Notification added to notification database successfully.",
      });
    } else {
      res.status(500).send({
        success: false,
        message: "Couldn't add notification to notification database.",
      });
    }
  } catch (err) {
    res.status(500).send({ success: false, message: "Something went wrong!" });
  }
};

export { sendToNotificationData };
