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
//var moment=require("moment");
//console.log(moment(new Date('').toISOString()).calendar());
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

var express = require("express");
var con=require("./database");  
var functionmodel = require('./functions_data.js');
var problemid="121";
var maxscore="25";

var sqlstmt='select user,MIN(answer) from submissions where problem_id='+problemid+' group BY user order by MIN(answer) DESC';
                            console.log(sqlstmt);
                            con.query(sqlstmt, function(err, result) {
                                //console.log(result[0]);
                                var rowlength=result.length;
                                for(i=0;i<rowlength;i++)
                                {
                                    user=result[i].user;
                                    var tempscore=(i+1)/rowlength*maxscore;
                                    console.log("i+1 is "+i+1);
                                    console.log("rowlength is "+rowlength);
                                    console.log("maxscore is "+maxscore);
                                    console.log("calculated score is "+tempscore);
                                    var stmt2={userid:user,problemid:problemid,score:tempscore};
                                    var updtstmt='UPDATE leaderboard set score="'+tempscore+'" where userid="'+user+'" and problemid="'+problemid+'"';
                                    console.log(updtstmt);
                                    con.query('INSERT INTO leaderboard SET ?',stmt2,function(err,row){
                                        if(err)
                                        {
                                            var updtstmt='UPDATE leaderboard set score="'+tempscore+'" where userid="'+user+'" and problemid="'+problemid+'"';   
                                            con.query(updtstmt,function(err,result){
                                                if(err)
                                                {
                                                    console.log("Err:"+err);
                                                }
                                                else
                                                {
                                                    console.log("updated");
                                                }
                                            });
                                        }
                                        else
                                        {
                                            console.log("inserted");
                                        }
                                    });
                                }
                            });
                            