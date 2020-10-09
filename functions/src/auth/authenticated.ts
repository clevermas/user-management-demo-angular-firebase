import { Request, Response } from 'express';
import * as admin from 'firebase-admin';
import { handleError } from '../utils';

export async function isAuthenticated(req: Request, res: Response, next: () => void) {
  const {authorization} = req.headers;
  const errorMsg = {code: 401, message: 'Unauthorized'};

  if (!authorization) {
    return handleError(res, errorMsg);
  }

  if (!authorization.startsWith('Bearer')) {
    return handleError(res, errorMsg);
  }

  const split = authorization.split('Bearer ');
  if (split.length !== 2) {
    return handleError(res, errorMsg);
  }

  const token = split[1];

  try {
    const decodedToken: admin.auth.DecodedIdToken = await admin.auth().verifyIdToken(token);
    res.locals = {...res.locals, uid: decodedToken.uid, role: decodedToken.role, email: decodedToken.email};
    return next();
  } catch (err) {
    return handleError(res, errorMsg);
  }
}
