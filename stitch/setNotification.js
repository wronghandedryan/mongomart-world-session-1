exports = function(itemId) {
  const currentUser = context.user;

  if (itemId) {
    return setNotification(itemId, currentUser.id);
  } else {
    console.error("No item ID provided: " + JSON.stringify(itemId));
    return false;
  }
};

async function setNotification(itemId, userId) {
  const collection = context.services.get("mongodb-atlas").db("mongomart").collection("item");
  try {
    await collection.updateOne({"_id": itemId}, { $addToSet: { notifications: userId }});
    return true;
  } catch(err) {
    console.error("Error while setting user-notification: " + JSON.stringify(err));
    return false;
  }
}