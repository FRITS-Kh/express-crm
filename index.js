import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';

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

app.use(express.static('public'));

routes(app);

app.get('/', (req, res) =>
  res.send(`Node and Express server is running on port ${PORT}`),
);

app.listen(PORT, () => console.log(`Your server is running on port ${PORT}`));
