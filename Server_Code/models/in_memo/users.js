
let USER_ID_START = 10000;
const users = [];

class User{
    constructor(params){
        if(!params.name||!params.age){
            throw new Error('no params!');
        }
        this.name = params.name;
        this.age = params.age;
        this._id = USER_ID_START++;
    }

}

function createANewUser(params){
 
    let user = new User(params);
    users.push(user);
    return user;
}
async function getUsers(params){
    return users;
}
async function getUserById(userId){
    return users.find(function(u){
        return (u._id===Number(userId));
    });
}
async function updateUserById(userId,update){
 
    const user = users.find(u=>u._id===Number(userId));
    if(update.name){
        user.name = update.name;
    } 
    if(update.age){
        user.age = update.age;
    } 
    users.push(user);
    console.log(users);
    return user;
}
module.exports = {
    model:User,
    createANewUser,
    getUserById,
    getUsers,
    updateUserById,
};