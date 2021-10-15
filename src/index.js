import express from 'express';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import configRoutes from './routes';

require('dotenv').config();

const app = express();

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

app.use(express.json());
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.headers = req.headers.authorization
    ? {
        authorization: `token ${req.headers.authorization.split(' ')[1]}`,
      }
    : {};
  next();
});

configRoutes(app);

export default app;
