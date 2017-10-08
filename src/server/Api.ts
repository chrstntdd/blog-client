import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { verify } from 'jsonwebtoken';
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

import typeDefs from './graphql/schemaDef';
import resolvers from './graphql/resolvers';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

/* 

mutation {
  signup(email: "ctodd@gmail.com", username: "ctodd", password: "password", firstName: "Christian", lastName: "Todd") {
    token
  }
}

---


mutation {
  signin(email: "ctodd@gmail.com", password: "password") {
    token
  }
}


*/

/* auth middleware */
const auth = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (!token) {
      req.user = null;
    } else {
      const { user } = await verify(token, JWT_SECRET);
      req.user = user;
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
  next();
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
    this.express.use(auth);
    this.express.use(
      '/graphiql',
      graphiqlExpress({
        endpointURL: '/graphql',
      })
    );
    this.express.use(
      '/graphql',
      graphqlExpress(req => ({
        schema,
        pretty: true,
        context: {
          secret: JWT_SECRET,
          user: req.user,
        },
      }))
    );
    this.express.use((err, req, res, next) => {
      console.error(err);
      res.status(err.status || 500).json({
        message: err.message,
        error: err,
      });
    });
  }
}
