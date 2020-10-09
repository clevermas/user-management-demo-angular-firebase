import { Response } from 'express';

export function handleError(res: Response, {code, message}: {code: number, message: string}) {
  return res.status(code || 500).send({
    code: code || 500,
    message: message || 'Internal Server Error'
  });
}

export function validate(fields: string[], data: any) {
  const missingFields = [];
  for (const field in data) {
    if (data.hasOwnProperty(field)) {
      if (!data[field] && fields.includes(field)) {
        missingFields.push(field);
      }
    }
  }
  return missingFields;
}
