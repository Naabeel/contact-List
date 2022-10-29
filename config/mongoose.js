const mongoose = require('mongoose');
 mongoose.connect('mongodb://localhost:27017/mongodb_db');
 var db = mongoose.connection;

 db.on('error' , function(){
    console.log('unable to connect with db');
 } );

 db.once('open',  function(){
    console.log('succcessfully connected to db');
 });
  module.exports = db;
 