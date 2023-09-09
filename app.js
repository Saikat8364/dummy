const https = require("https");
const express= require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var fs = require("fs");
const mysql=require("mysql");
const passport = require('passport')
const session = require('express-session')
const LocalStrategy = require('passport-local').Strategy
const c1 = require('./routes/child1.js');
const c2 = require('./routes/child2.js');
const app=express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(session({
  secret: "secret",
  resave: false ,
  saveUninitialized: true ,
}))
// This is the basic express session({..}) initialization.
app.use(passport.initialize()) 
// init passport on every route call.
app.use(passport.session())    
// allow passport to use "express-session".

//Defining the strategy used to authenticate user
authUser = (user, password, done) => {
  //Search the user, password in the DB to authenticate the user
  var sql = 'Select id,fname from admin where uname="'+user+'" and password="'+password+'"';
  con.query(sql,function(err,result){
    if (err) throw err;
    if(result.length>0){
      let authenticated_user = { id: result[0].id, name: result[0].fname}
      console.log(result[0].fname);
      return done (null, authenticated_user )
    }else{
      return done(null,false)
    }
  })
}
//Use the new Strategy
passport.use(new LocalStrategy (authUser))
//Serialize User
passport.serializeUser(function(user, done) {
  console.log(`--------> Serialize User`)
  console.log(user)     
  return done(null, user);
});
//Deserialize User
passport.deserializeUser(function(user, done) {
  console.log(`--------> DeSerialize User`)
  console.log(user) 
  return done(null, user);
});
//Function to set authentication requirement valdiation
// function requireAuth(req,res,next){
//   if (req.isAuthenticated()) { return next() }
//   res.redirect("/login")
// }


app.use('/child1',c1);
app.use('/child2',c2);


var con = mysql.createConnection({
  host: "localhost",
	// port:"3306",
  user: "root",
  password: "Saikat1234",
  database: "schooldb",
});
con.connect(function(err){
  if(err) throw err;
  console.log('Connection Successfull!');
});




app.get("/login", (req, res) => {
  res.render("login.ejs")

})

app.post ("/login", passport.authenticate('local', {
  successRedirect: "/child1",
  failureRedirect: "/login",
}))

// app.get("/child1",requireAuth,(req,res)=>{
//   res.render('dashboard.ejs',{name:req.user.name})
// })
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function (){
  console.log("Server has started successfully.");
});