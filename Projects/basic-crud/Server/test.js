let arrtest = ['pratik','sudhherr', 'rutvi'];
let dic = [];
for(let i = 0; i< arrtest.length; i++){
    let name = arrtest[i].toString()
    let obj = {
        name : arrtest[i].length
    };
    dic.push(obj);
}

console.log(dic);