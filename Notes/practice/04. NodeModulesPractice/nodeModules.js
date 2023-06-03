const axios = require('axios');

axios.get('http://google.com').
then((response)=>{
    console.log("response is : ", response);
}).
catch((err)=>{
    console.log("error is : ", err);
}).
then(()=>{
    console.log("Execution done");
})


