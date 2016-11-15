var express = require("express");
var router = express.Router();
var con=require("./database");  
var functionmodel = require('./functions_data.js');
module.exports = router;


router.route('/:uid')
.post(function (req, res) {
    if(!req.session.emailid)
    {
      req.session.error="You are not logged in! Please login to see that page";
      res.redirect('/login');
      return;
    }
    var problemid=req.params.uid;
    var answer=req.body.answer;
    //console.log(answer);
    var arr=answer.split(" ");
    //console.log(arr);
    //console.log(req.session.emailid);
    var sqlstmt="SELECT dimension,score,optimization from problems where uid= "+problemid;
    con.query(sqlstmt,function(err,rows){
        if(err)
            throw err;
        else
        {
            maxscore=rows[0].score;
            optimization=rows[0].optimization;
            functionmodel[problemid](arr,rows[0].dimension,function(ans){
                //console.log(ans);
                var sqlstmt = {user: req.session.emailid, problem_id: problemid,answer: ans,submission_value:answer};
                con.query('INSERT INTO submissions SET ?', sqlstmt, function(err, result) {
                    if(err) throw err;
                    else
                    {
                        req.session.success="Success! Your answer has been successfully submitted!";
                        res.redirect('/contests/all');
                        if(optimization=='MAXIMIZE'){
                            var sqlstmt='select user,MAX(answer) from submissions where problem_id='+problemid+' group BY user order by MAX(answer)';
                            con.query(sqlstmt, function(err, result) {
                                var rowlength=result.length;
                                for(i=0;i<rowlength;i++)
                                {
                                    user=result[i].user;
                                    var tempscore=(i+1)/rowlength*maxscore;
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
                            

                        }
                        else{
                            var sqlstmt='select user,MIN(answer) from submissions where problem_id='+problemid+' group BY user order by MIN(answer) DESC';
                            console.log(sqlstmt);
                            con.query(sqlstmt, function(err, result) {
                                //console.log(result[0]);
                                var rowlength=result.length;
                                for(i=0;i<rowlength;i++)
                                {
                                    user=result[i].user;
                                    var tempscore=(i+1)/rowlength*maxscore;
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
                            
                        }
                    }
                });
            });
        }
    });
    
/*    var problemdetail = 'SELECT * FROM problems where uid = '+ problem_id;
    //console.log(problemdetail);
    con.query(problemdetail,function(err,rows){
         if(err) throw err;

            else 
            {
                //console.log(rows[0]);
                //console.log(rows[1]);
                res.render("problemdetail", { title: "Contests", problemdata:rows[0],user_name: req.session.user_name});
            }
            //console.log(rows);
        });*/
    });