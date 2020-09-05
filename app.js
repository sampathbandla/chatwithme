const express = require("express");
const { simpleflake } = require('simpleflakes');
const app = new express()
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const session = require('express-session');
require('dotenv').config()

const MongoClient = require('mongodb').MongoClient;
const uri = process.env.DB_URI;

var mongoUtil = require(__dirname + "/database.js")

mongoUtil.connectToServer( function( err, client ) {
  if (err) throw (err);
  else
  {




    var db = mongoUtil.getDb();


    io.on('connection', function(socket){
    
      // After Node Connected
      db.collection("users").insertOne({"socket_id":socket.id,"url":socket.request.headers.referer})
      socket.join(socket.request.headers.referer)
      //After SettingUp username
      socket.on("username",(details) => {
        
        db.collection("userdetails").insertOne({"socket_id":socket.id,"name":details.username,"image":details.image})
        var users = {};
        qry = {"url":socket.request.headers.referer}
        db.collection("users").find(qry, { projection:{socket_id:1,url:0,_id:0}}).toArray((err,result) => {
          
        });
      });
      
      //SECTION  on sending msg
      socket.on("send-message",(data) => {
        io.to(socket.request.headers.referer).emit("recive-msg",{"socketid":socket.id,"img":data.pic,"time":data.date,"name":data.username,"msg":data.msg})
      });

      // After Node Got Disconnected
      socket.on("disconnect",() => {
         // Deleting Socket from users
          var qry = {"socket_id":socket.id};
          db.collection("users").deleteOne(qry,(err,obj) => {
            if(err)
            {
              throw err;
            }
          });

          // Deleting Socket from userdetails
          db.collection("userdetails").deleteOne(qry,(err,obj) => {
            if(err)
            {
              throw err;
            }
          });
      });
    
    });



  }
});








// SECTION LISTENING PORT
// let local_port = 8080;


http.listen(process.env.PORT, function(){
  console.log('listening on http://127.0.0.1:'  + process.env.PORT);
});


// SECTION USE AND SET METHODS
app.use(express.static("public"))
app.use(session({secret: 'chatwithmebro',saveUninitialized: true,resave: true}));
app.set("view engine", "ejs")
var sess;



// TODO Routes
app.get("/", (req,res) => {
    res.render("index",{"url":""});
});

app.get("/chat/:id", (req, res) => {
  sess = req.session;
  sess.id = req.query.id;
  res.render("chat");
});

app.get("/getnewid",(req,res) => {
  const flakeBigInt = simpleflake();
  newid = flakeBigInt.toString();
  res.send(newid);
});
