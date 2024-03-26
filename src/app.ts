import express from 'express';

export const app = express();

const bodyParser = express.json();

app.use(bodyParser);

app.get('/', (req, res) => {
  res.status(200).json({ version: '1.0' });
});
