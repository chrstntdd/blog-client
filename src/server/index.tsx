import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import ReactDOM from 'react-dom/server';
import {
  ApolloClient,
  createNetworkInterface,
  ApolloProvider,
  renderToStringWithData
} from 'react-apollo';
import { StaticRouter } from 'react-router';
import { makeExecutableSchema } from 'graphql-tools';
import { verify } from 'jsonwebtoken';
import typeDefs from './graphql/schemaDef';
import resolvers from './graphql/resolvers';

import Html from '../client/routes/Html';
import Layout from '../client/routes/Layout';

const app = express();
require('dotenv').config();
let DATABASE_URL;
let PORT;

/* set environment variables */
if (app.get('env') === 'production') {
  DATABASE_URL = process.env.MONGODB_URI;
  PORT = parseInt(process.env.PORT, 10);
} else {
  DATABASE_URL = process.env.TEST_DATABASE_URL;
  PORT = 3000;
}
const JWT_SECRET = process.env.JWT_SECRET;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
const mongoose = require('mongoose');

/* Set mongoose promise to native ES6 promise */
mongoose.Promise = global.Promise;

const connectOptions = {
  useMongoClient: true,
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
};

/* auth middleware */
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
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

/* Middleware stack */
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(auth);
app.use(async (req, res) => {
  try {
    const client = new ApolloClient({
      ssrMode: true,
      networkInterface: createNetworkInterface({
        uri: 'http://localhost:3000'
      })
    });

    const context = {};

    const app = (
      <ApolloProvider client={client}>
        <StaticRouter location={req.url} context={context}>
          <Layout />
        </StaticRouter>
      </ApolloProvider>
    );

    const content = await renderToStringWithData(app);
    const data = client.store.getState().apollo.data;
    res.status(200);

    const html = <Html content={content} state={{ apollo: { data } }} />;
    res.send(`<!doctype html>\n${ReactDOM.renderToStaticMarkup(html)}`);
    res.end();
  } catch (err) {
    console.log('RENDERING ERROR');
    res.status(500);
    res.end('An error occurred');
  }
});

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql'
  })
);
app.use(
  '/graphql',
  graphqlExpress(req => ({
    schema,
    pretty: true,
    context: {
      secret: JWT_SECRET,
      user: req.user
    }
  }))
);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message,
    error: err
  });
});

/* Starting the server and connecting to DB */

let server;

export const runServer = async (
  databaseUrl: string = DATABASE_URL,
  port: number = PORT
) => {
  try {
    await mongoose.connect(databaseUrl, connectOptions);
    await new Promise((resolve, reject) => {
      server = app
        .listen(port, () => {
          console.info(
            `✨  Server listening on port ${port}. Let's get this money. ✨`
          );
          resolve();
        })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  } catch (err) {
    console.error(err);
  }
};

export const closeServer = async () => {
  try {
    await mongoose.disconnect();
    await new Promise((resolve, reject) => {
      console.info(`Closing server. Goodbye old friend.`);
      server.close(err => {
        err ? reject(err) : resolve();
      });
    });
  } catch (err) {
    console.error(err);
  }
};

require.main === module && runServer().catch(err => console.error(err));
