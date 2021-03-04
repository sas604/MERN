const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;

const routes = require('./routes/index');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const uri = process.env.DB_URL;
mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
const { connection } = mongoose;
connection.once('open', (err) => {
  console.log(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫`);
});
const corsOptions = {
  origin: 'http://localhost:3000', // the port my react app is running on.
  credentials: true,
};
app.use(cors(corsOptions));
app.set('trust proxy', 1);
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET,
    name: process.env.KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 360000000000, secure: false, httpOnly: true },
    store: MongoStore.create({ mongoUrl: uri }),
  })
);

app.use('/', routes);
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
