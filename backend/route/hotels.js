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



// user add hotel
app.post('/hoteladd', (req,res,next) =>{
  const hotel = new Hotel({
    userAccount:req.body.userAccount,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    name: req.body.name,
    location : req.body.location,
    image: req.body.image,
    price: req.body.price
  });
  hotel.save();
  res.status(201).json({
    message: 'POST SEND SUCCESFFULY'
  });
});

// display all hotels
app.get('/hotels',(req, res, next) => {
  Hotel.find().then(documents =>{
    res.json({
      hotels: documents
    });
  });
});

// display hotel detail by id
app.get('/hoteldetail/:id', (req,res,next) =>{
    Hotel.findById(req.params.id).then(documents =>{
      console.log(documents);
       res.json({
         hotels: documents
       });
    });
});



//update hotels information include hotel manager information and hotel's price
app.put('/hotels/:userAccount', (req, res, next)=>{
  const userAccount = req.params.userAccount;
  // const updateOps ={};
  // for(const ops of req.body){
  //     updateOps[ops.propName] = ops.vaule;
  // }
  Hotel.update({userAccount: userAccount},{$set: 
    //updateOps
    {
      userAccount:req.body.userAccount,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      name: req.body.name,
      location: req.body.location,
      image: req.body.image, 
      price : req.body.price,
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
