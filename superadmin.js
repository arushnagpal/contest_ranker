var express = require("express");
var router = express.Router();
var con=require("./database");
module.exports = router;


router.route('/')
.get(function (req, res) {
  res.redirect('/home');
});

router.route('/logout')
.get(function (req, res) {
  req.session.destroy();
  res.redirect('/home');
});

router.route('/home')
.get(function (req, res) {
  res.render("superadmin/home", { title : "Home", user_name: req.session.user_name});
});

router.route('/livesubmissionstats/:contestid')
.get(function (req, res) {
  var contestid = req.params.contestid;
  var submissions = 'select user,problem_id,submission_value,answer,time_submitted from submissions where problem_id IN (select problem_id from contest_map where contest_id = '+contestid+')';
  con.query(problemdetail,function(err,rows){
    if(err) throw err;
    else 
    {
            res.render("livesubmissionstats", { title: "Live tracking", problemdata:rows[0],user_name: req.session.user_name});
    }
    });   

});

router.route('/createcontest')
.get(function (req, res) {
  res.render('superadmin/createcontest',{ title: "Create Contest",user_name: req.session.user_name});
})
.post(function (req,res) {
    var contestname=req.body.contestname;
    var description=req.body.description;
    var status=req.body.status;
    var startdate=req.body.startdate;
    var starttime=req.body.starttime;
    var enddate=req.body.enddate;
    var endtime=req.body.endtime;
    var start=startdate+" "+starttime;
    var end=enddate+" "+endtime;
    
    var sqlstmt = {contest_name: contestname, description: description,status: status,start_date:start,end_date:end};
    con.query('INSERT INTO contests SET ?', sqlstmt, function(err, result) {
        if(err)
        {
          req.session.error="Error! The contest could not be created.";
          console.log("Err: "+err);
          res.redirect('/superadmin/createcontest');
        }
        else
        {
          req.session.success="Success! The contest has been successfully created!";
          res.redirect('/superadmin/createcontest');
        }
    });
    return;
    //res.render('superadmin/createcontest',{ title: "Create Contest",user_name: req.session.user_name});
});

router.route('/createproblem')
.get(function (req, res) {
  res.render('superadmin/createproblem',{ title: "Create Problem",user_name: req.session.user_name});
})
.post(function (req,res) {
    var problemname=req.body.problemname;
    var statement=req.body.statement;
    var description=req.body.description;
    var difficulty=req.body.difficulty;
    var probtype=req.body.probtype;
    var dimension=req.body.dimension;
    var score=req.body.score;
    var image=req.body.image;
    var optimization=req.body.optimization;
    var sqlstmt = {name: problemname,statement:statement, description: description,difficulty:difficulty, type:probtype,dimension:dimension,score:score,image: image,optimization:optimization};
    con.query('INSERT INTO problems SET ?', sqlstmt, function(err, result) {
        if(err)
        {
          req.session.error="The problem could not be created.";
          console.log("Err: "+err);
          res.redirect('/superadmin/createproblem');
        }
        else
        {
          req.session.success="The problem has been successfully created!";
          res.render('superadmin/createproblem',{ title: "Create Problem",user_name: req.session.user_name, inserted: result.insertId});
        }
    });
    return;
    //res.render('superadmin/createcontest',{ title: "Create Contest",user_name: req.session.user_name});
});

router.route('/linkproblemtocontest')
.get(function (req, res) {
  var contests = 'SELECT contest_id,contest_name FROM contests';
  var unlinkedproblems = 'SELECT uid,name FROM problems where problems.uid NOT IN (SELECT problem_id from contest_map)';
  con.query(contests+' ; '+unlinkedproblems,function(err,rows){
     if(err) throw err;

     else 
     {
              //console.log(rows[0]);
              //console.log(rows[1]);
              res.render('superadmin/linkproblemtocontest', { title: "Link Problems", contestdata: rows[0],problemdata:rows[1],user_name: req.session.user_name});
          }
          //console.log(rows);
      });
  //res.render('superadmin/linkproblemtocontest',{ title: "Create Problem",user_name: req.session.user_name});
})
.post(function (req,res) {
    var problem=req.body.problem;
    var contest=req.body.contest;
    var sqlstmt = {contest_id: contest,problem_id: problem};
    con.query('INSERT INTO contest_map SET ?', sqlstmt, function(err, result) {
        if(err)
        {
          req.session.error="The problem could not be linked. Some Error. Please check again";
          console.log("Err: "+err);
          res.redirect('/superadmin/linkproblemtocontest');
        }
        else
        {
          req.session.success="The problem has been successfully added to the contest!";
          res.redirect('/superadmin/linkproblemtocontest');
        }
    });
    return;
    //res.render('superadmin/createcontest',{ title: "Create Contest",user_name: req.session.user_name});
});







































/*var uuid = require("node-uuid");
var _ = require("lodash");
var express = require("express");
var rooms = require("./data/rooms.json");

var router = express.Router();
module.exports = router;

router.get('/rooms', function (req, res) {
  res.render("rooms", {
    title: "Admin Rooms",
    rooms: rooms
  });
});

router.route('/rooms/add')
  .get(function (req, res) {
    res.render("add");
  })
  .post(function (req, res) {
    var room = {
      name: req.body.name,
      id: uuid.v4()
    };

    rooms.push(room);

    res.redirect(req.baseUrl + "/rooms");
  });

router.route('/rooms/edit/:id')
  .all(function(req, res, next){
    var roomId = req.params.id;

    var room = _.find(rooms, r => r.id === roomId);
    if (!room) {
      res.sendStatus(404);
      return;
    }
    res.locals.room = room;
    next()
  })
  .get(function (req, res) {
    res.render("edit");
  })
  .post(function (req, res) {
    res.locals.room.name = req.body.name;

    res.redirect(req.baseUrl + "/rooms");
  });

router.get('/rooms/delete/:id', function (req, res) {
  var roomId = req.params.id;

  rooms = rooms.filter(r => r.id !== roomId);

  res.redirect(req.baseUrl + "/rooms");
});

*/