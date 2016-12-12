var express = require("express");
var con=require("./database");  
var functionmodel = require('./functions_data.js');


module.exports={
    updateit: function (problemid,maxscore){
    var sqlstmt='select user,MIN(answer) from submissions where problem_id='+problemid+' group BY user order by MIN(answer) DESC';
        console.log(sqlstmt);
        con.query(sqlstmt, function(err, result) {
            //console.log(result[0]);
            var rowlength=result.length;
            for(i=0;i<rowlength;i++)
            {
                user=result[i].user;
                var tempscore=(i+1)/rowlength*maxscore;
                console.log("i+1 is "+i);
                console.log("rowlength is "+rowlength);
                console.log("maxscore is "+maxscore);
                console.log("calculated score is "+tempscore);
                var stmt2={userid:user,problemid:problemid,score:tempscore};
                var updtstmt='UPDATE leaderboard set score="'+tempscore+'" where userid="'+user+'" and problemid="'+problemid+'"';
                console.log(updtstmt);
                con.query('INSERT INTO leaderboard SET ?',stmt2,function(err,row){
                    if(err)
                    {
                        var tempscore=(i+1)/rowlength*maxscore;
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
}

} 