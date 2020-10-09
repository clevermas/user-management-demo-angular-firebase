import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';

const cors = require('cors')({origin: true});

admin.initializeApp();

const app = express();

app.use(cors);

export const api = functions.https.onRequest(app);

export * from './contacts/contacts-triggers';
