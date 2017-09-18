const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/one_for_all';

mongoose.connect(uri);
const db = mongoose.connection;

db.on('open',(err,result) => {
    console.log('open connnecting!');
})
db.on('close',(err,result)=>{
    console.log(err);
    console.log(result);
})

db.on('error',(err,result) => {
    console.log(err);
    console.log(result);
})