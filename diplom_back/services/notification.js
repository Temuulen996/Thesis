const { title } = require("process");
const asyncHandler = require("../middleware/asyncHandler");
const Notification = require("../models/notification");
const { Expo } = require("expo-server-sdk");
let expo = new Expo();
exports.SendNotifications = asyncHandler(async (clothingName) => {
  let messages = [];
  const tokens = await Notification.find();
  console.log("🚀 ~ exports.SendNotifications=asyncHandler ~ tokens:", tokens);
  for (let pushToken of tokens) {
    if (!Expo.isExpoPushToken(pushToken.token)) {
      console.error(
        `Push token ${pushToken.token} is not a valid Expo push token`
      );
      continue;
    }

    // Add each message to an array
    messages.push({
      to: pushToken?.token,
      sound: "default",
      title: "Ethrift Mongolia Шинээр хувцас нэмэгдлээ",
      body: `Шинээр ${clothingName} Нэртэй хувцас нэмэгдлээ.`,
      data: { withSome: "data" },
    });
  }
  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];
  for (let chunk of chunks) {
    try {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(...ticketChunk);
      // Optionally, handle each ticket to check for delivery status
    } catch (error) {
      console.error(error);
    }
  }
  console.log(`Notifications sent to ${tokens.length} devices.`);
});
