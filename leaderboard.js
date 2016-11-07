var express = require("express");
var router = express.Router();
var con=require("./database");
module.exports = router;

router.route('/')
  .get(function (req, res) {
    con.query('SELECT * FROM contests',function(err,rows){
         if(err) throw err;

            else     
              res.render("leaderboard_contests", { title : "Choose a contest", data : rows, user_name: req.session.user_name});
            console.log(rows);
        });
  });
router.route('/:cid')
  .get(function (req, res) {
  	var p=req.params.cid;
    res.render("leaderboard", { title : "Leaderboard for " + p , user_name: req.session.user_name});
  })
  .post(function(req, res) {
});
