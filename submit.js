var express = require("express");
var router = express.Router();
module.exports = router;


router.route('/:uid')
.get(function (req, res) {
 var p=req.params.uid;
 res.render("submit", { title : "Submit your solution", forname: p});
})
.post(function(req, res) {
  var sampleFile;
  
  if (!req.files) {
    res.send('No files were uploaded.');
    return;
  }
  
  sampleFile = req.files.solution;
  sampleFile.mv('uploads/abc.csv', function(err) {
    if (err) {
      res.status(500).send(err);
    }
    else {

      res.send('File uploaded!Leaderboard will be updated soon');
    }
  });
});
