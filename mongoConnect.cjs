const mongoose = require('mongoose');

const uri = 'mongodb+srv://janhavikulkarni096:vN3hKJagGoSHTDLy@arova-cluster.uf6cuwb.mongodb.net/?retryWrites=true&w=majority&appName=arova-cluster';

mongoose.connect(uri)
  .then(() => console.log('✅ Connected to MongoDB Atlas!'))
  .catch(err => console.error('❌ MongoDB connection error:', err));
