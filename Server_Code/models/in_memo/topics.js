
let TOPIC_ID_START = 10000;
const topics = [];

class Topic{
    constructor(params){
        if(!params.creator){
            throw {code:-1,msg:'a topic must create by a user!'};
        }
        if(!params.title){
            throw {code:-1,msg:'a topic must have a title!'};
        }
        if(params.content.length<5){
            throw {code:-1,msg:'topic content too short!'};
        }
        this.content = params.content;
        this.title = params.title;
        this._id = TOPIC_ID_START++;
        this.reply = [];
    }

}

function createANewTopic(params){
    console.log(params);
    let topic = new Topic(params);
    topics.push(topic);
    return topic;
}
async function getTopics(params){
    return topics;
}
async function getTopicById(topicId){
    return topics.find(function(u){
        return (u._id===topicId);
    });
}
async function updateTopicById(topicId,update){
 
    const topic = topics.find(u=>u._id===topicId);
    if(update.title){
        topic.title = update.title;
    } 
    if(update.content){
        topic.content = update.content;
    } 
    topics.push(topic);
    return topic;
}

async function replyTopic(params){
    const topic = topics.find(u=>u._id===Number(params.topicId));
    console.log('reply topic entering!');
    console.log(params);
    console.log(topic);
    topic.reply.push({
        creator:params.creator,
        content:params.content,
    });
    return topic;
}
module.exports = {
    model:Topic,
    createANewTopic,
    getTopicById,
    getTopics,
    updateTopicById,
    replyTopic,
};