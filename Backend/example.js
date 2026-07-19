// const crypto = require("crypto")
// const hash = crypto.createHmac('sha256', "something")
// .update("You have to pay the bearer 500 indian rupeed only!")
// .digest('hex');
// console.log(hash)


const shubham_hash = "5dda7b3368458742e83df9faa0c3901f78a589cc38918a9a4a7eea905fd0aeee";
const shubham_msg = "You have to pay the bearer 5000 indian rupeed only!"

const crypto = require("crypto")
const hash = crypto.createHmac("sha256", "something")
    .update(shubham_msg)
    .digest("hex")

if(hash==shubham_hash){
    console.log("Message is legitimate!");
}else{
    console.log("Message ke saath chhed chaad hua hai!")
}