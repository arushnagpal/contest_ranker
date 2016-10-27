var express = require("express");
var router = express.Router();
var con=require("./database");
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
       if(err) throw err;

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
        con.query('SELECT distinct contest_id,contest_name,description,time_created FROM contests',function(err,rows){
           if(err) throw err;

           else res.render("contests", { title: "Contests", data: rows,user_name: req.session.user_name});
            //console.log(rows);
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


