var express = require("express");
var router = express.Router();
var con=require("./database");
module.exports = router;

router.route('/contests/:pid')
  .get(function (req, res) {
    var pid=req.params.pid;
    con.query('select userid,score from leaderboard where problemid="'+pid+'" order by score desc',function(err,rows){
         if(err) throw err;

            else     
              res.render("leaderboard", { title : "Leaderboard", data : rows, user_name: req.session.user_name,problem:pid});
            console.log(rows);
        });
  });
router.route('/')
  .get(function (req, res) {
    con.query('select userid, SUM(score) as score from leaderboard group by userid order by score DESC',function(err,rows){
         if(err) throw err;

            else     
              res.render("leaderboard", { title : "Leaderboard", data : rows, user_name: req.session.user_name});
            console.log(rows);
        });
  });
router.route('/:cid')
  .get(function (req, res) {
  	var p=req.params.cid;
    res.render("leaderboard", { title : "Leaderboard" , user_name: req.session.user_name});
  })
  .post(function(req, res) {
});
