import { parseString } from 'xml2js';

export default (body: string) =>
  new Promise((resolve, reject) => {
    parseString(body, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
