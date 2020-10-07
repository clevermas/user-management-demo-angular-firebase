import { Request, Response } from 'express';

export function isAuthorized(opts: { hasRole: Array<'admin' | 'user'> }) {
  return (req: Request, res: Response, next: () => void) => {
    const {role} = res.locals;

    if (!role) {
      return res.status(403).send();
    }

    if (opts.hasRole.includes(role)) {
      return next();
    }

    return res.status(403).send();
  };
}
