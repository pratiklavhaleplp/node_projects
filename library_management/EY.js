let a = [1,3,[5,8,[0,2,4]]];
let arrTest = [];
// console.log(arr);

function recArr(arr){
    for(let i = 0;i< arr.length; i++){
        if(typeof arr[i] === 'number'){
            arrTest.push(arr[i]);
        }else if(typeof arr[i] === 'object'){
            recArr(arr[i]);
        }
    }
}
recArr([1,3,[5,8,[0,2,4]]]);
console.log(arrTest);

