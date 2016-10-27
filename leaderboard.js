var express = require("express");
var router = express.Router();
var con=require("./database");
module.exports = router;

router.route('/')
  .get(function (req, res) {
    con.query('SELECT * FROM contests',function(err,rows){
         if(err) throw err;

            else     
              res.render("leaderboard_contests", { title : "Choose a contest", data : rows});
            console.log(rows);
        });
  });
router.route('/:cid')
  .get(function (req, res) {
  	var p=req.params.cid;
    res.render("leaderboard", { title : "Leaderboard for " + p });
  })
  .post(function(req, res) {
});
