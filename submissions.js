var express = require("express");
var router = express.Router();
var con=require("./database");
module.exports = router;

router.route('/')
  .get(function (req, res) {
    if(!req.session.emailid)
    {
      req.session.error="You are not logged in! Please login to see that page";
      res.redirect('/login');
      return;
    }
    var sqlstmt="SELECT submissions.answer,submissions.time_submitted,problems.name FROM submissions,problems where submissions.problem_id=problems.uid and submissions.user=" + "'"+req.session.emailid+"' order by submissions.time_submitted DESC";
       console.log(sqlstmt);
        con.query(sqlstmt,function(err,rows){
         if(err) throw err;

            else     
              res.render("submissions", { title : "My Submissions", data : rows,user_name: req.session.user_name});
            console.log(rows);
        });
  });
router.route('/:cid')
  .get(function (req, res) {
  	var p=req.params.cid;
    res.render("leaderboard", { title : "Leaderboard for " + p ,user_name: req.session.user_name});
  })
  .post(function(req, res) {
});
