import notificationData from "../../models/notificationData.js";

const getNotifications = async (req, res) => {
  const { user_id } = req.params;

  try {
    const result = await notificationData.find({ userId: user_id });

    if (result.length !== 0) {
      // console.log(result, 'notifications from getnotificaitoncontrller');
      res
      .status(200)
      .send({
        success: true,
        data: result,
        message: "Got notifications successfully.",
      });
    } else {
      // console.log(result, 'notifications from getnotificaitoncontrller else');
      res
      .status(200)
      .send({ success: false, message: "No notification available." });
    }
  } catch (err) {
    // console.log(result, 'notifications from getnotificaitoncontrller error');
    res.status(500).send({ success: false, message: "Something went wrong!" });
  }
};

export { getNotifications };
