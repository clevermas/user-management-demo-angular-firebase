import { Request, Response } from 'express';
import { handleError } from '../utils';

export function isAuthorized(opts: { hasRole: Array<'admin' | 'user'> }) {
  return (req: Request, res: Response, next: () => void) => {
    const {role} = res.locals;
    const errorMsg = {code: 403, message: 'Access denied'};

    if (!role) {
      return handleError(res, errorMsg);
    }

    if (opts.hasRole.includes(role)) {
      return next();
    }

    return handleError(res, errorMsg);
  };
}
