var express = require('express');
var router = express.Router();
/*
const User = require('../models/in_memo/users');
const Topic = require('../models/in_memo/topics');
*/
const User = require('../models/mongo/users');
const Topic = require('../models/mongo/topics');
const auth = require('../middleware/auth');
/* GET users listing. */
router.route('/')
  .get((req,res,next) => {
    (async ()=>{
        console.log('entering get request!')
      let topics = await Topic.getTopics();
      return {
        code:0,
        topics:topics,
      }
    })()
    .then(r=>{
      res.json(r);
    })
    .catch(e =>{
      next(e);
    })
   
  })
  .post(auth(),(req,res,next) => {
    (async () => {
      let user = await User.getUserById(req.body.userId);
     
      let topic = await Topic.createANewTopic({creator:user,title:req.body.title,content:req.body.content});
      return {
        code:0,
        topic:topic,
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
     
      let topic = await Topic.getTopicById((req.params.id));
      return {
        code:0,
        topic:topic,
      }
    })()
    .then(r=>{
      res.json(r);
    })
    .catch(e =>{
      next(e);
    })

  })
  .patch(auth(),(req,res,next) => {
    (async ()=>{
      console.log('entering patch router!');
      let user = await User.getUserById(req.body.userId);
      console.log(user);
      let topic = await Topic.updateTopicById(req.params.id,{creator:JSON.stringify(user),title:req.body.title,content:req.body.content});
      return {
        code:0,
        topic:topic,
      }
    })()
    .then(r=>{
      res.json(r);
    })
    .catch(e =>{
      next(e);
    })
  })

  router.route('/:id/reply')
  .post(auth(),(req,res,next) => {
    (async ()=>{
       console.log('entering post a topic');
      
      let user = await User.getUserById(req.body.userId);
      console.log('username is :');
      console.log(user);
      let topic = await Topic.replyTopic({
          topicId:req.params.id,
          creator:user,
          content:req.body.content,
      });
      return {
        code:0,
        topic:topic,
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
