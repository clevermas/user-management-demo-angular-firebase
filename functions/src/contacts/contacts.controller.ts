import * as express from 'express';
import * as admin from 'firebase-admin';

import { isAuthenticated } from '../auth/authenticated';
import { isAuthorized } from '../auth/authorized';
import { handleError, validate } from '../utils';
import { CONTACTS_COLLECTION } from './contacts.collection';
import { ContactModel } from './contact.model';

const router = express();

export function contactsController() {
  // create new contact
  router.post('/', [
    isAuthenticated,
    isAuthorized({hasRole: ['admin']}),
    createNewContact
  ]);

  return router;
}

async function createNewContact(req: express.Request, res: express.Response) {
  const fields = ['email', 'role', 'password', 'phone', 'firstName', 'lastName', 'birthDate'];
  const data: ContactModel = req.body;
  const validation = validate(fields, data);
  if (validation.length) {
    handleError(res, {code: 400, message: 'Missing fields: ' + validation.join(', ')});
  } else {
    try {
      const {uid} = await admin.auth().createUser({
        email: data.email,
        password: data.password
      });

      await admin.auth().setCustomUserClaims(uid, {role: data.role});

      const newContact = data;
      delete data.password;
      await admin.firestore().collection(CONTACTS_COLLECTION).add(newContact);

      res.status(200).json({code: 200, message: 'Created'});
    } catch (e) {
      handleError(res, {code: 400, message: e.message});
    }
  }
}
