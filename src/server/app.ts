import express from 'express';
import type { RequestHandler, ErrorRequestHandler } from 'express';
import * as helmet from 'helmet';
// import Tokens from 'csrf';
import csrf from 'csurf';
import cookieParse from 'cookie-parser';
import bodyParser from 'body-parser';
import Color from 'colors';

const allowedOrigins: Readonly<string[]> = [
  'http://localhost:3000',
];
const allowedHeaders: Readonly<string[]> = [
  'Origin',
  'X-Requested-with',
  'Content-Type',
  'Accept',
  'Access-Control-Allow-Origin',
  'Access-Control-Allow-Credentials',
  'X-Xsrf-Token',
  'CSRF-Token',
];
const exposedHeader: Readonly<string[]> = [
  'Content-Disposition',
];

const csrfProtection = csrf({ cookie: true });

const useColorPlugin = () => {
  Color.setTheme({
    silly: 'grey',
    verbose: 'cyan',
    prompt: 'red',
    info: 'grren',
    debug: 'magenta',
    error: 'red',
  });
};

const useSetHeaders: RequestHandler = (req, res, next) => {
  const origin = req.headers.origin || '';
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigins);
  }
  res.setHeader('Access-Control-Allow-Headers', allowedHeaders);
  res.setHeader('Access-Control-Expose-Headers', exposedHeader);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
}

const useErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(req.body);
  if (err.code !== 'EBADCSRFTOKEN') return next(err);

  res.status(403);
  res.send('form tampered with');
}

const createApp = () => {
  useColorPlugin();

  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParse());
  app.use(helmet.contentSecurityPolicy());
  app.use(useSetHeaders);
  app.use(csrfProtection);
  app.use(useErrorHandler);

  return app;
};

export default createApp();
