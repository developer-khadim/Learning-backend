require('dotenv').config();
const mongoose = require('mongoose');

mangoose.connect(ProcessingInstruction.env.MONGODB_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
      console.log('Connected to MongoDB');
}).catch((err)=>console.log('Error connecting to MongoDB:', err));
module.exports = mongoose;