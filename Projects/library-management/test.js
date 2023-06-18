let test = {
  '"ISBN";"Book-Title";"Book-Author";"Year-Of-Publication";"Publisher";"Image-URL-S";"Image-URL-M";"Image-URL-L"': '"0002005018";"Clara Callan";"Richard Bruce Wright";"2001";"HarperFlamingo Canada";"http://images.amazon.com/images/P/0002005018.01.THUMBZZZ.jpg";"http://images.amazon.com/images/P/0002005018.01.MZZZZZZZ.jpg";"http://images.amazon.com/images/P/0002005018.01.LZZZZZZZ.jpg"'
};

;
let str = new String(Object.keys(test)[0]);
let val = new String(Object.values(test)[0]);
let ObjKey = str.split(";").map(ele => ele.replace(/"/g, ''));
let value = val.split(";").map(ele => ele.replace(/"/g, ''));


let finalObject = {};
ObjKey.map((ele, index) => {
  Object.assign(finalObject, { [ele.toString()]: value[index] });
});

console.log('final object is : ', finalObject);
