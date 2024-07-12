import express from "express";
import { getNotifications, sendToNotificationData } from "../controllers/index.js";

const router = express.Router();

router
  .get("/get_notifications/:user_id", getNotifications)
  .post("/send_to_notification_data", sendToNotificationData);

export default router;
