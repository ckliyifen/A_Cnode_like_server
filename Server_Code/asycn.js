/*
let p = new Promise((resolve,rejected) => {
    setTimeout(()=>{
        console.log(3);
    },0)

    process.nextTick(()=>{
        console.log(1);
        resolve('hey');
    })
})

p.then(r=>{
    console.log(2);
})
*/
let test = require('./test');
console.log(test);