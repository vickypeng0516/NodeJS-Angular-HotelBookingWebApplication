const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//mongoose.connect("mongodb://localhost/final", {useNewUrlParser:true});
mongoose.connect('mongodb+srv://ding:wawxlyhz@cluster0-4f120.mongodb.net/test?retryWrites=true',{
  useNewUrlParser:true
});


const Order = require('./model/order');


const User = require('./model/user');



const Hotel = require('./model/hotel');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST,PUT, PATCH, DELETE, OPTIONS");
  next();
});



// add user
app.post('/users', (req,res,next) =>{
  const user = new  User({
    UserAccount: req.body.UserAccount,
    UserPassword: req.body.UserPassword,
    Role: req.body.Role
  });
  user.save();
  res.status(201).json({
    message: 'POST SEND SUCCESFFULY'
  });
});




// display all users
app.get('/users',(req, res, next) => {
  User.find().then(documents =>{
    res.json({
      user: documents
    });
  });
});




//update hotel manager basic information especially password
app.put('/users/:UserAccount', (req, res, next)=>{
  const UserAccount = req.params.UserAccount;
  User.update({UserAccount: UserAccount},{$set: 
    //updateOps
    {
      UserAccount: req.body.UserAccount,
      UserPassword: req.body.UserPassword,
      Role: req.body.Role,  
    }
  })
  .exec()
  .then((result)=>{
      console.log(result);
      res.status(200).json(result);
  })
  .catch(err =>{
      console.log(err);
      res.status(500).json({
          error: err
      })
  });
  res.status(201).json({
    message: 'Handling PUT requests to /Connections',
  });
});

//获取hotelM信息的get方法  与 hm.service.ts get方法相关联
// app.get('/hotels', (req, res, next) => {
//   Hotel.find().then(documents =>{
//     res.json({
//       message: 'fetched succesfully',
//       Hotel: documents
//     });
//   });
// });
module.exports = app;
