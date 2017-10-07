import Api from './Api';
const mongoose = require('mongoose');

require('dotenv').config();

const app: Api = new Api();

const env = app.currentEnv();

let DATABASE_URL;
let PORT;

/* set environment variables */
if (env === 'production') {
  DATABASE_URL = process.env.MONGODB_URI;
  PORT = process.env.PORT;
} else {
  DATABASE_URL = process.env.TEST_DATABASE_URL;
  PORT = 3000;
}

/* Set mongoose promise to native ES6 promise */
mongoose.Promise = global.Promise;

const connectOptions = {
  useMongoClient: true,
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
};

let server;

export const runServer = async (
  databaseUrl: string = DATABASE_URL,
  port: number = PORT
) => {
  try {
    await mongoose.connect(databaseUrl, connectOptions);
    await new Promise((resolve, reject) => {
      server = app.express
        .listen(port, () => {
          console.info(
            `✨  Server listening on port ${port} in a ${env} environment ✨`
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
