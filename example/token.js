const TokenClient = require('../src/clients');

const client = new TokenClient();
console.log("[client getMacAddress]", client.getMacAddress) // get mac Address

// init
const conf = {
	name: "tom medle",
 	roject_name: "my project",
 	user_name: "myUserName1",
 	password: "123456"
};
 

const init = client.init(conf);
console.log("[client init]", init);
 
// check inti success
/* if(init){
  client.registerAccress().then(res => { 
    if(!res.status) throw new Error(res); // error
    // success
    console.log(res)
  }).catch(err => console.log(err)) 
} */

// generate token 
/* client.generateToken(conf.user_name, conf.password).then((res) => {
  if(res.status === true) 
    console.log("[generateToken]: ", res.token);
    token = res.token
}); */

// test access token
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVfYjk3MmE1YmQ0MF9mYjhkM2QwZTUzIiwibmFtZSI6InRvbSBtZWRsZSIsImNyZWF0ZWQiOiIyMDIzLTEyLTIxIDE1OjU3OjA0IiwidXBkYXRlZCI6IjIwMjMtMTItMjEgMTY6MDg6MDAiLCJpYXQiOjE3MDMxNDk3MTYsImV4cCI6MTcwMzIzNjExNn0.HZjYaDTe4ilPEgBcYGT0Ihy5tKLlTRQ5DDak8I0B0OY";
client.textAccess(token).then(res => {
  console.log("[textAccess]: ", res);
}).catch(err => console.log(JSON.stringify(err)))



