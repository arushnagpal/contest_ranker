/*var m = require('./functions_data.js');
var a='f1';
var arr=[1,2,5];
console.log(m[a](arr,3));

*/

var jsonfile = require('jsonfile')

var file = 'data.json'
var obj = {name: 'JP'}

jsonfile.writeFile(file, obj, function (err) {
  console.error(err)
})


/*
Variable number of arguments
function foo() {
  for (var i = 0; i < arguments.length; i++) {
    console.log((arguments[i]));
  }
}

foo(1,4,6,7,5,8,9);
*/