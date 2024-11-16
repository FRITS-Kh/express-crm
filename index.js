import express from 'express';
import { rateLimit } from 'express-rate-limit';
import mongoose from 'mongoose';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

import routes from './src/routes/crm';

const app = express();
const PORT = 3000;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/CRMdb');

app.use(helmet());
app.use(limiter);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = undefined;

  const authHeader = req.headers?.authorization;
  if (authHeader?.startsWith('JWT ')) {
    const token = authHeader.slice(4);

    try {
      req.user = jwt.verify(token, 'SecretWord');
    } catch (err) {
      console.error('JWT verification failed:', err.message);
    }
  }

  next();
});

app.use(express.static('public'));

routes(app);

app.get('/', (req, res) =>
  res.send(`Node and Express server is running on port ${PORT}`),
);

app.listen(PORT, () => console.log(`Your server is running on port ${PORT}`));
