import express, { json } from 'express';

const app = express();

app.use(json());

app.get('/api/users/currentuser', (req, res) => {
  res.send('hello!');
});

app.listen(3000, () => {
  console.log('Listening on http://localhost:3000');
});
