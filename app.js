//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require('lodash');

const homeStartingContent = "Hi, this is Shadman Aziz, and this is my Workout journal";
const aboutContent = "I am a 4th year student at uoft Computer science";
const contactContent = "Contact me using links provided below";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];




app.get("/", function(req,res){
res.render("home",{homeStartingContent:homeStartingContent,posts:posts});
});
app.get("/about", function(req,res){
res.render("about",{aboutContent:aboutContent});
});
app.get("/contact", function(req,res){
res.render("contact",{contactContent:contactContent});
});
app.get("/compose", function(req,res){
res.render("compose");
});
app.post("/compose",function(req,res){
  const post = {postTitle:req.body.newItemTitle,postBody:req.body.newItem};
  posts.push(post);
  res.redirect("/");
})

app.get("/posts/:postName",function(req,res){
   const requestedPost = req.params.postName;
   var newRequestedPost = lodash.lowerCase(requestedPost);

   posts.forEach(function(post){
    const postName = lodash.lowerCase(post.postTitle);
    if(postName === newRequestedPost){
      res.render("post",{postTitle:postName,postBody:post.postBody})
    }
  })

})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
