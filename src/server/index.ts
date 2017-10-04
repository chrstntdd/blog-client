import * as express from 'express';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as logger from 'morgan';
import { createServer } from 'spdy';
import { readFileSync } from 'fs';
import { join } from 'path';

const options = {
  key: readFileSync(join('dist', __dirname, '/keys/server.key')),
  cert: readFileSync(join('dist', __dirname, '/keys/server.crt')),
  ca: readFileSync(join('dist', __dirname, '/keys/server.csr'))
};

const app = express();

app.use(helmet());
app.use(compression());
app.use(logger('dev'));
app.use(express.static('public'));

app.get('/', async (req, res, next) => {
  try {
    const file = await readFileSync(join('dist', __dirname, 'index.html'));
    res.writeHead(200);
    res.end(file);
  } catch (err) {
    console.log(err);
  }
});

let server = createServer(options, app);

server.listen(8080, err => {
  err
    ? console.error(err)
    : console.log(`Listening @ ${server.address().port}`);
});
