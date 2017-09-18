
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const replySchema = new mongoose.Schema({
    creator:Schema.Types.ObjectId,
    content:String,
})
const topicSchema = new mongoose.Schema({
    creator:{type:String,required:true},
    title:String,
    content:String,
    replyList:[replySchema],
})

const TopicModel = mongoose.model('topic',topicSchema);

async function createANewTopic(params){
    console.log('entering creat a topic');
    console.log(params.creator);
    let topic = new TopicModel({
                                creator:params.creator,
                                title:params.title,
                                content:params.content,
                                });
    
    return await topic.save()
                .catch(err => {
                    console.log(err);
                    throw new Error('error creating a user!');
                });
}

async function getTopics(params={page:0,pageSize:10}){
    let flow = TopicModel.find({});
    flow.skip(params.page*params.pageSize);
    flow.limit(params.pageSize);
    return await flow.catch(err => {
                                console.log(err);
                                throw new Error('error getting topics from db!');
                            });
}

async function getTopicById(topicId){
    return await TopicModel.findOne({_id:topicId})
                     .catch(err => {
                         console.log(err);
                         throw new Error('error getting a topic by id!');
                     });
}

async function updateTopicById(topicId,update){
   console.log('updateiiiing!')
    console.log(update);
    
    return await TopicModel.findOneAndUpdate({_id:topicId},update,{new:true})
                           .catch(err => {
                               console.log(err);
                               throw new Error(`error updateTopicbyid :${topicId}`);
                           })
}

async function replyTopic(params){
   
    return await TopicModel.findOneAndUpdate({_id:params.topicId},
                                            {$push:{replyList:{creator:params.creator[0]._id,content:params.content}}},
                                            {new:true})
                                            .catch(err => {
                                                console.log(err);
                                                throw new Error(`error reply a topic: ${JSON.stringify(params)}`)
                                            })
}
module.exports = {
    model:TopicModel,
    createANewTopic,
    getTopicById,
    getTopics,
    updateTopicById,
    replyTopic,
};