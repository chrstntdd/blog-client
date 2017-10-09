const faker = require('faker');
const fs = require('fs');
const mongoose = require('mongoose');

import { randomBytes } from 'crypto';
import { runServer, closeServer } from '../src/server';
import User from '../src/server/db/user-model';
const TEST_DATABASE_URL = process.env.TEST_DATABASE_URL;
mongoose.Promise = global.Promise;

const generatePost = (firstName, lastName) => ({
  title: faker.lorem.words(),
  body: faker.lorem.paragraphs(),
  author: `${firstName} ${lastName}`
});

const generateRandomBytes = n => {
  const token = randomBytes(n);
  return token.toString('hex');
};

const generateNPosts = (n, firstName, lastName) => {
  let posts = [];

  for (let i = 0; i < n; i++) {
    posts.push(generatePost(firstName, lastName));
  }

  return posts;
};

const generateNUsers = n => {
  let users = [];

  for (let i = 0; i < n; i++) {
    users.push(generateUser());
  }

  return users;
};

const generateUser = (posts = 5) => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();

  return {
    firstName,
    lastName,
    username: faker.internet.userName(),
    password: generateRandomBytes(12),
    email: faker.internet.email(),
    posts: generateNPosts(posts, firstName, lastName)
  };
};

const output = JSON.stringify(generateNUsers(5));

/**
 * node -e 'require("./test/genTestData.js").writeFileToDisk()'
 */

const writeFileToDisk = () => {
  fs.writeFile('./test/testdata.json', output, 'utf8', err => {
    err ? console.error(err) : console.log('THE FILE WAS SAVED. THANK JESUS');
  });
};

const tearDownDb = async () => await mongoose.connection.dropDatabase();

const testData = require('./testdata.json');

const seedData = async testData => {
  try {
    await tearDownDb();
    await runServer(TEST_DATABASE_URL);
    await User.insertMany(testData);
    await closeServer();
  } catch (err) {
    console.log(err);
  }
};

module.exports = { generatePost, writeFileToDisk, seedData };
