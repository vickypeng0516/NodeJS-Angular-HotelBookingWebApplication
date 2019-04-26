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


// user book hotel
app.post('/hotelbook', (req,res,next) =>{
  const order = new Order({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email,
    date: req.body.date,
    hotelId: req.body.hotelId,
    hotelName: req.body.hotelName
  });
  order.save();
  console.log("Save Order");
  res.status(201).json({
    message : 'POST SEND SUCCESFFULY'
  });
});

//获取hotelM信息的get方法  与 hm.service.ts get方法相关联
app.get('/orders', (req, res, next) => {
  Order.find().then(documents =>{
    res.json({
      users: documents
    });
  });
});


//hotel manager 查看order的调用，返回json值得名称有所不同
app.get('/orders', (req, res, next) => {
  Order.find().then(documents =>{
    res.json({
      orders: documents
    });
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
