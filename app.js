var express = require("express");
var app = express();
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/foobar");
var schema = new mongoose.Schema({
   title: String,
   body: String,
   date: {
      type: Date,
      default: Date.now
   }
});

var BlogPost = mongoose.model("BlogPost",schema);

app.get("/",function(req,res){
   for(i=0;i<3;i++){
  var  blogPost = new BlogPost({
     title: "this is my new title"+i,
     body : "This is my new body"+i
  });
   
   blogPost.save(function(err){
      if(err){
         console.log("Error occured while saving:"+err);
      }
   });
   }
   res.send("Hello World");
});


app.get("/get",function(req,res){
   BlogPost.find({},function(err,blogs){
        if(err){
           console.log("Error occured while fetching");
        }else{
           res.json(blogs);
        }
   });
});

app.get("/save",function(req,res){
  var  blogPost = new BlogPost({
     title: "save title",
     body : "save Body"
  });
   
   blogPost.save(function(err,savedBlog){
      if(err){
         console.log("Error occured while saving:"+err);
      }
       res.send("saved blog:"+savedBlog);
   });
  });


var server = app.listen(3000,function(){
   console.log("listening on port %d",server.address().port);
});
