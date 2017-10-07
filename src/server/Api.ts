import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as graphQLHTTP from 'express-graphql';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'ultrasupersecret';

import schema from './graphql/schema';

/* auth middleware */
const getUser = async req => {
  const token = req.headers.authorization;
  try {
    if (token) {
      const decoded = await verify(token, JWT_SECRET);
      req.user = decoded.user;
    }
  } catch (err) {
    console.log('user not authenticated');
  }
  req.next();
};

export default class Api {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    /* no need to add resource routes with graphql :^]  */
  }

  public currentEnv(): string {
    return this.express.get('env');
  }

  private middleware(): void {
    this.express.use(helmet());
    this.express.use(morgan('dev'));
    this.express.use(bodyParser.json());
    this.express.use(getUser);
    this.express.use(
      '/graphql',
      graphQLHTTP(req => ({
        schema,
        graphiql: true,
        pretty: true,
        context: {
          secret: JWT_SECRET,
          user: req.user
        }
      }))
    );
    this.express.use((err, req, res, next) => {
      console.error(err);
      res.status(err.status || 500).json({
        message: err.message,
        error: err
      });
    });
  }
}
