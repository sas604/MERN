const express = require('express');
const cors = require('cors');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
  },
});
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;

const routes = require('./routes/index');
const WorkOrder = require('./models/WorkOrder');

require('dotenv').config();

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
    cookie: { maxAge: 6048000000, secure: false, httpOnly: true },
    store: MongoStore.create({ mongoUrl: uri }),
  })
);
io.on('connection', function (socket) {
  console.log('A user connected');
  WorkOrder.watch().on('change', (data) => socket.emit('Hello'));
  // Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
    console.log('A user disconnected');
  });
});
app.use(express.static('public'));
app.use('/', routes);
http.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
