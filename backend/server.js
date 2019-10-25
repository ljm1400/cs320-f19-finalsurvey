const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = "mongodb://finalsoftwareuser:finalsoftware@finalsoftware-shard-00-00-o2c5h.mongodb.net:27017,finalsoftware-shard-00-01-o2c5h.mongodb.net:27017,finalsoftware-shard-00-02-o2c5h.mongodb.net:27017/test?ssl=true&replicaSet=finalsoftware-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

//const surveysRouter = require('./routes/surveys');
//const usersRouter = require('./routes/users');

//app.use('/surveys', surveysRouter);
//app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});