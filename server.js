import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import { recordCommuteTime } from './server/RecordFormController';

const app = express();
const upload = multer();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.post('/commute', recordCommuteTime);

app.listen(3001, () => {
  console.log({
    message: 'Server running on 3001',
  });
});
