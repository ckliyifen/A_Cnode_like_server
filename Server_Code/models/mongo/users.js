
const mongoose = require('mongoose');
const crypto = require('crypto');
const bluebird = require('bluebird');
const pbkdf2Asycn = bluebird.promisify(crypto.pbkdf2);
const SALT = require('../../cipher').PASSWORD_SALT;

mongoose.Promise = global.Promise;

/*add phonenumber and password for authorization! */
const UserSchema = new mongoose.Schema({
    name:{type:String,required:true,unique:true,},
    age:{type:Number,min:[20,'younger error!']},
    phoneNumber:String,
    password:String,
    avatar:String,
});

UserSchema.index({name:1,age:1});
UserSchema.index({name:1,unique:true});
const DEFAULT_PROJECT = {password:0,phoneNumber:0,__v:0};

const UserModel = mongoose.model('UserModel',UserSchema);

async function createANewUser(params){
 
    let user = await new UserModel({name:params.name,age:params.age,phoneNumber:params.phoneNumber});
    user.password = await pbkdf2Asycn(params.password,SALT,512,128,'sha1')
       .then(r => r.toString())
       .catch(err => {
           throw new Error('something goes wrong inside the server');
       })
    let creator =  await user.save()
    .catch(err => {
      console.log(err);
    });

    return {
        _id:creator._id,
        name:creator.name,
        age:creator.age,
       
    }
   
}

async function getUsers(params = {page:0,pagesize:10}){
    let flow = UserModel.find({});
    flow.select(DEFAULT_PROJECT);
    flow.skip(params.page*params.pagesize);
    flow.limit(params.pagesize);

    return await flow.catch(err => {
      console.log(err);
      throw new Error('error getting users form db')
    })

}

async function getUserById(userId){
    return await UserModel.find({_id:userId})
            .select(DEFAULT_PROJECT)
           .catch(err => {
             console.log(err);
             throw new Error(`error getting a user by ${userId}`);
           });
}

async function updateUserById(userId,update){
 
    return await UserModel.findByIdAndUpdate({_id:userId},update,{new:true})
           .catch(err => {
             console.log(err);
             throw new Error(`error update by id : ${userId}`)
           });
}

async function login(phoneNumber,password){
    console.log(phoneNumber);
    console.log(password);
    console.log('hahhahahhahahahh');
    let passwd = await pbkdf2Asycn(password,SALT,512,128,'sha1')
    .then(r => r.toString())
    .catch(err => {
        console.log(err);
        throw new Error('something goes wrong inside the server!');

    })
    console.log(passwd);
    const user = await UserModel.findOne({phoneNumber:phoneNumber})
    .select(DEFAULT_PROJECT)
    .catch(err => {
        console.log(`error loging in,phonenumber is ${phoneNumber}`);
        throw new Error('something goes wrong with the server!');
    })
    if(!user){
        throw new Error('noe such user!');
    }
    return user;
}

module.exports = {
   model:UserModel,
    createANewUser,
    getUserById,
    getUsers,
    updateUserById,
    login,
};