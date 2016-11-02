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
            req.session.usertype=rows[0].usertype;
            if(req.session.usertype=="SUPERADMIN")
              res.redirect('/superadmin/home');
            else if(req.session.usertype=="ADMIN")
              res.redirect('/admin/home');
            else
              res.redirect('/home');
         }
         else
         {
           req.session.error="Sorry! Incorrect Password";
           res.redirect('/login');
         }
       }
       else
       {
          req.session.error="User not registered. Please register first from the signup page</a>";
          res.redirect('/login');
       }
        //console.log(rows);
      });    

});
