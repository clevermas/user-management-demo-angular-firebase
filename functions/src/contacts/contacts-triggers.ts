import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const createContactTrigger = functions.firestore
  .document('contacts/{contactId}')
  .onCreate(async snap => {
    const {email, role} = snap.data();

    functions.logger.log(snap.data());

    if (email && role) {
      const {uid} = await admin.auth().createUser({
        password: 'changeme',
        email
      });
      await admin.auth().setCustomUserClaims(uid, {role});
    }
  });
