var express = require("express");
var router = express.Router();
var con=require("./database");
module.exports = router;


router.route('/')
.get(function (req, res) {
 if(req.session.user_name)
 {
  res.redirect('/home');
}
else
 res.render("login", { title : "Home", user_name: req.session.user_name});
})
.post(function (req, res) {
  var password=req.body.password;
  var username=req.body.username;
  var data= {email: username};
	//console.log(data);
	con.query('SELECT * from users where ?',data,function(err,rows){
         //console.log(rows);

         if(err) throw err;
         else if(rows.length==1) 
         {
          if(rows[0].password==password)
          {
           req.session.user_name=rows[0].firstname;
           req.session.authenticated="true";
           req.session.emailid=rows[0].email;
           res.redirect('/home');
         }
         else
         {
           req.session.error="Sorry! Incorrect Password";
           res.redirect('/login');
         }
       }
       else
         res.send("User not registered. Register <a href='/signup'>here</a>");
       res.end();
        //console.log(rows);
      });    

});
