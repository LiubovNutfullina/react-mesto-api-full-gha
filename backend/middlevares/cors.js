const allowedCors = [
  'http://localhost:3000',
  'http://domainlyubov.students.nomoredomains.rocks',
  'https://domainlyubov.students.nomoredomains.rocks',
  'http://api.domainlyubov.students.nomoredomains.rocks',
  'https://api.domainlyubov.students.nomoredomains.rocks',
  'https://api.domainlyubov.students.nomoredomains.rocks/signin',
  'http://158.160.42.148',
  'https://158.160.42.148',
];

const corsProcess = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end;
  }
  return next();
};

module.exports = {
  corsProcess,
};
