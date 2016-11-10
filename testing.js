/*var m = require('./functions_data.js');
var a='f1';
var arr=[1,2,5];
console.log(m[a](arr,3));

*/

/*var con=require("./database");
/con.query('SELECT start_date from contests;select * from contests', function(err,rows){
	rows[0][0].start_date=rows[0][0].start_date.toDateString();
	console.log(rows[0][0].start_date);
});
*/
//console.log(new Date().toISOString());
var moment=require("moment");
console.log(moment(new Date().toISOString()).calendar());
//console.log(moment(new Date().toISOString()).isValid());

/*var jsonfile = require('jsonfile')

var file = 'data.json'
var obj = {name: 'JP'}

jsonfile.writeFile(file, obj, function (err) {
  console.error(err)
})
*/

/*
Variable number of arguments
function foo() {
  for (var i = 0; i < arguments.length; i++) {
    console.log((arguments[i]));
  }
}

foo(1,4,6,7,5,8,9);
*/