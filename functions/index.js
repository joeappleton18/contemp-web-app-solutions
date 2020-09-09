const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
const auth = admin.auth();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const error = (type, message) => {
  throw new functions.https.HttpsError(type, message);
};

const checkAdminPrivileges = async (uid) => {
  try {
    const userRef = await db.collection("users").doc(uid).get();
    const user = userRef.data();
    if (user.type !== "admin") {
      error(
        "failed-precondition",
        "a user id must be passed into this function"
      );
    }
  } catch (e) {
    error("failed-precondition", "could not retrieve admin user");
  }
};

exports.userJoined = functions.auth.user().onCreate((user) => {
  const userObj = {
    id: user.uid,
    displayName: user.displayName,
    email: user.email,
    checkins: []
  };
 
  return db.collection('users').doc(user.uid).set(userObj);

});

/*
exports.scheduledFunctionCrontab = functions.pubsub.schedule('1 * * * *')
  .timeZone('Europe/London') // Users can choose timezone - default is America/Los_Angeles
  .onRun(async () => {
    try {
      const userRef = await db.collection("users").get();
      userRef.forEach(u => db.collection("users")
      .doc(u.id)
      .update({checkedIn:false}));
    } catch (e) {
      console.error(e)
    }


}); */

exports.userCheckedIn = functions.firestore
  .document("checkins/{checkInId}")
  .onCreate(async (snap, context) => {
    // get the data
    const checkin = snap.data();
    const userRef =  db.collection("users").doc(checkin.userId);
    const userDoc = await userRef.get();
    const user = userDoc.data();
    const checkins = user.checkins ? user.checkins : [];
   
    checkins.push(checkin.total);
    useRef.update({ checkins: checkins });
    return snap.ref.update({ checkins: checkins });
  });

exports.listUsers = functions.https.onCall(async (snap, context) => {
  try {
    const users = await admin.auth().getUsers();
    return users;
  } catch (e) {
    error("post-condition", "network request failed");
  }
});

exports.suspendUser = functions.https.onCall(async (data, context) => {
  checkAdminPrivileges(context.auth.uid);
  if (!data || !data.id || !data.suspend) {
    error("failed-precondition", "a user id must be passed into this function");
  }

  try {
    auth.updateUser(data.id, { disabled: data.suspend });
    return { message: "all good", user: `${user.email} + has been ` };
  } catch (e) {
    error("post-condition", "network request failed");
  }
});
