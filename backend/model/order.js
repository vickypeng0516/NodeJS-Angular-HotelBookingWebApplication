const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  date: String,
  hotelName: String,
  hotelId: String,
  userId: String
});

module.exports = mongoose.model('Order', orderSchema);
