var express = require("express");
var router = express.Router();
var con=require("./database");
var moment=require("moment");
module.exports = router;


router.route('/')
.get(function (req, res) {
    res.redirect('/contests/all');
});

router.route('/:id/problems/:uid')
.get(function (req, res) {
    var contest_id=req.params.id;
    var problem_id=req.params.uid;

    var problemdetail = 'SELECT * FROM problems where uid = '+ problem_id;
    //console.log(problemdetail);
    con.query(problemdetail,function(err,rows){
       if(err) 
       {
        console.log("Err: "+err);
        return;
       }
       else 
       {
                //console.log(rows[0]);
                //console.log(rows[1]);
                res.render("problemdetail", { title: "Contests", problemdata:rows[0],user_name: req.session.user_name});
            }
            //console.log(rows);
        });
});

router.route('/:id/problems')
.get(function (req, res) {
    var contest_id=req.params.id;
    var contestdetail = 'SELECT * FROM contests where contest_id = ' + contest_id;
    var problemdetail = 'SELECT * FROM problems where uid in (SELECT problem_id from contest_map where contest_id = '+contest_id + ')';
    //console.log(contestdetail);
    //console.log(problemdetail);
    con.query(contestdetail+' ; '+problemdetail,function(err,rows){
       if(err) throw err;

       else 
       {
                //console.log(rows[0]);
                //console.log(rows[1]);
                res.render("problems", { title: "Contests", contestdata: rows[0],problemdata:rows[1],user_name: req.session.user_name});
            }
            //console.log(rows);
        });
});

router.route('/:id')
.get(function (req, res) {
    var abc=req.params.id;
    if(abc=='all')
    {
        con.query('SELECT distinct contest_id,contest_name,description,start_date,end_date FROM contests where status="ACTIVE";SELECT distinct contest_id,contest_name,description,start_date,end_date FROM contests where status="ARCHIVED"',function(err,rows){
           if(err) 
            console.log("Err:"+ err);
           else{
            for(i=0;i<rows[0].length;i++){
              rows[0][i].start_date=new Date(rows[0][i].start_date);
              rows[0][i].start_date=rows[0][i].start_date.toISOString();
              rows[0][i].start_date=moment(rows[0][i].start_date).calendar();
              rows[0][i].end_date=new Date(rows[0][i].end_date);
              rows[0][i].end_date=rows[0][i].end_date.toISOString();
              rows[0][i].end_date=moment(rows[0][i].end_date).calendar();
            }
            for(i=0;i<rows[1].length;i++){
              rows[1][i].start_date=new Date(rows[1][i].start_date);
              //rows[1][i].start_date=rows[0][i].start_date.toISOString();
              rows[1][i].start_date=moment(rows[1][i].start_date.toISOString()).calendar();
              rows[1][i].end_date=new Date(rows[1][i].end_date);
              rows[1][i].end_date=rows[1][i].end_date.toISOString();
              rows[1][i].end_date=moment(rows[1][i].end_date).calendar();
            }
            res.render("contests", { title: "Contests", data: rows[0],data2:rows[1],user_name: req.session.user_name});
          }//console.log(rows);
        });
    }
    else
    {
      var path='/contests/'+abc+'/problems';
      res.redirect(path);
/*        con.query('SELECT * FROM contests where `uid` = ?',[req.params.id],function(err,rows){
         if(err) throw err;

            else res.render("contests", { title: "Contests", data: rows,user_name: req.session.user_name});
            //console.log(rows);
        });*/
    }
});


