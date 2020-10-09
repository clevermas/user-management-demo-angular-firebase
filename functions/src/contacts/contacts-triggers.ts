import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { CONTACTS_COLLECTION } from './contacts.collection';

export const createContactTrigger = functions.firestore
    .document(CONTACTS_COLLECTION + '/{contactId}')
  .onCreate(async snap => {
    const data = snap.data();
    const {email, role} = data;

    if (email && role) {
      await admin.firestore().doc(CONTACTS_COLLECTION + '/' + snap.id).update({
        firstName: 'John',
        lastName: 'Doe',
        phone: '+385555555555',
        birthDate: 747694800000
      });

      const {uid} = await admin.auth().createUser({
        password: 'changeme',
        email
      });

      await admin.auth().setCustomUserClaims(uid, {role});
    }
  });
