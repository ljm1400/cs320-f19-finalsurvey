const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();


router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/html/manager_home.html'));
});

router.get('/home',function(req,res){
  res.sendFile(path.join(__dirname+'/html/manager_home.html'));
});


router.get('/createSurvey',function(req,res){
  res.sendFile(path.join(__dirname+'/html/create_survey.html'));
});


app.use("/css", express.static(__dirname +'/css'));
app.use("/res", express.static(__dirname + '/res'))
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');