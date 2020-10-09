import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';

import { contactsController } from './contacts/contacts.controller';

const cors = require('cors')({origin: true});

admin.initializeApp();

const app = express();

app.use(cors);
app.use('/contacts', contactsController());

export const api = functions.https.onRequest(app);
