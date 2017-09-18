const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/one_for_all';

mongoose.Promise = global.Promise;
mongoose.connect(uri);
const db = mongoose.connection;

const UserSchema = new mongoose.Schema({
    name:{type:String,required:true,unique:true,enum:['ck','gy','dd']},
    age:{type:Number,min:[20,'younger error!']}
});



UserSchema.methods.sayYourName = function(){
    return this.name;
}
UserSchema.statics.findByName = async function(nameStr){
    return await this.findOne({name:nameStr});
    
}


const UserModel = mongoose.model('user',UserSchema);

db.on('open',() => {
    (async () => {
       // let found = await UserModel.findByName('ck');
       // return found;
       let user = await new UserModel({name:'ck',age:120});
       await user.save();
       return user;
    })()
    .then(r => {
        console.log('hhahah');
        console.log(r.sayYourName());
    })
    .catch(e =>{
        console.log(e);
    })
}
)
/*
db.on('open',()=>{
    console.log('mongoose creat connection!');
    (async () => {
        let created = await UserModel.create({
            name:'ckguye',
            age:23,
        })
        .then();
        return created;
    })()
    .then( r => {
        console.log('entering then promise!')
        console.log(r);
        let found = UserModel.findOne({name:'ckguye'});
        console.log(found.sayYourName());

    })
    .catch(err => {
        console.log(err);
    })
})
*/
db.on('close',(err,result)=>{
    console.log(err);
    console.log(result);
})

db.on('error',(err,result) => {
    console.log(err);
    console.log(result);
})