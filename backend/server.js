const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('config');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri= config.get('mongoURI');
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const surveysRouter = require('./routes/surveys');
//const usersRouter = require('./routes/users');

app.use('/surveys', surveysRouter);
//app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});