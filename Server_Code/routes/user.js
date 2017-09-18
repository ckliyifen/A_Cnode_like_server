var express = require('express');
var router = express.Router();
/*this did not use mongodb,just save in memory*/
//const User = require('../models/in_memo/users');

/*use mongodb to save users information! */
const User = require('../models/mongo/users');
const auth = require('../middleware/auth');

const multer = require('multer');
const path = require('path');
const upload = multer({dest:path.join(__dirname,'../public/upload')});
/* GET users listing. */
router.route('/')
  .get((req,res,next) => {
    (async ()=>{
      let users = await User.getUsers();
      return {
        code:0,
        users:users,
      }
    })()
    .then(r=>{
      res.json(r);
    })
    .catch(e =>{
      next(e);
    })
   
  })
  .post((req,res,next) => {
    (async () => {
      let users = await User.createANewUser({name:req.body.name,
                                             age:req.body.age,
                                            phoneNumber:req.body.phoneNumber,
                                          password:req.body.password});
      return {
        code:0,
        users:users,
      }
    })()
    .then(r=>{
      res.json(r);
    })
    .catch(e =>{
      next(e);
    })
    
  })

router.route('/:id')
  .get((req,res,next) => {
    (async ()=>{
      console.log('entering getbyid!')
      let users = await User.getUserById((req.params.id));
      return {
        code:0,
        users:users,
      }
    })()
    .then(r=>{
      res.json(r);
    })
    .catch(e =>{
      next(e);
    })

  })
  .patch(auth(),upload.single('avatar'),(req,res,next) => {
    (async ()=>{
      console.log('entering for updating users!!!!!')
      let update = {};
      if(req.body.name){
        update.name = req.body.name;
      }
      if(req.body.age){
        update.age = req.body.age;
      }
      update.avatar = path.join('/upload',req.file.filename); 
      let users = await User.updateUserById((req.params.id),update);
      console.log(update.avatar);

      return {
        code:0,
        users:users,
      }
    })()
    .then(r=>{
      res.json(r);
    })
    .catch(e =>{
      next(e);
    })
  })
module.exports = router;
