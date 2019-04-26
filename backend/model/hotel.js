const mongoose = require('mongoose');
const hotelSchema = mongoose.Schema({
  userAccount:String,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  name: String,
  location: String,
  image: String,
  price: String
});

module.exports = mongoose.model('Hotel', hotelSchema);
