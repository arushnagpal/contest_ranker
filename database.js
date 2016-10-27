var mysql = require("mysql");

// First you need to create a connection to the db
var con = mysql.createConnection({
  host: "sql6.freesqldatabase.com",
  user: "sql6141899",
  password: "h91CATbHIH",
  database: "sql6141899",
  multipleStatements: true
});
/*
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1225",
  database: "contest_ranker",
  multipleStatements: true
});*/

con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

module.exports=con;