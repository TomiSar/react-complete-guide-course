import multer from 'multer';

const upload = multer({
  storage: multer.memoryStorage(),
});

const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

export { upload, runMiddleware };
