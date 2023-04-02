const express=require("express");
var app=express();
const mongoose=require("mongoose");
app.set("view engine","ejs");
var path = require('path');
var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")));
var _=require("lodash");
require("dotenv").config();

mongoose.connect("mongodb+srv://"+process.env.NAME+":"+process.env.PASSWORD+"@cluster0.fxijpz7.mongodb.net/blogdb",{useNewUrlParser:true});


var home_content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic vero laborum, aperiam quaerat harum iure, expedita, atque explicabo fuga omnis inventore accusamus quam distinctio quidem suscipit illum nobis. Nisi temporibus quidem nam laborum iure maxime cumque sconsequuntur! Expedita officia ut illum iure ipsum obcaecati temporibus unde ex natus. Modi, ex, incidunt, eaque consequuntur molestias earum voluptates placeat nisi assumenda animi quis magni. Sit tenetur consectetur, aperiam accusamus numquam voluptates nulla debitis.";

var about_content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic vero laborum, aperiam quaerat harum iure, expedita, atque explicabo fuga omnis inventore accusamus quam distinctio quidem suscipit illum nobis. Nisi temporibus quidem nam laborum iure maxime cumque sconsequuntur! Expedita officia ut illum iure ipsum obcaecati temporibus unde ex natus. Modi, ex, incidunt, eaque consequuntur molestias earum voluptates placeat nisi assumenda animi quis magni. Sit tenetur consectetur, aperiam accusamus numquam voluptates nulla debitis.";

var contact_content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic vero laborum, aperiam quaerat harum iure, expedita, atque explicabo fuga omnis inventore accusamus quam distinctio quidem suscipit illum nobis. Nisi temporibus quidem nam laborum iure maxime cumque sconsequuntur! Expedita officia ut illum iure ipsum obcaecati temporibus unde ex natus. Modi, ex, incidunt, eaque consequuntur molestias earum voluptates placeat nisi assumenda animi quis magni. Sit tenetur consectetur, aperiam accusamus numquam voluptates nulla debitis.";

const blogSchema= new mongoose.Schema({
    heading:String,
    Content:String
});

const blog=mongoose.model("blog",blogSchema);

app.get("/",function(req,res){
    blog.find({}).then(function(elem) {
        res.render("home",{content:home_content,posts:elem});
    })
})

app.get("/about",function(req,res){
    res.render("about",{content:about_content});
})

app.get("/contact",function(req,res){
    res.render("contact",{content:contact_content});
})

app.get("/compose",function(req,res){
    res.render("compose");
})

app.post("/compose",function(req,res){
    const NewBlog=new blog({
        heading:req.body.title,
        Content:req.body.post
    });
    NewBlog.save();
    res.redirect("/");
});

app.get("/:postName",function(req,res){
    blog.find({}).then(function(elem) {
       for(var i=0;i<elem.length;i++){
        if(_.lowerCase(elem[i].heading)===_.lowerCase(req.params.postName)){
            res.render("posts",{title:elem[i].heading,post:elem[i].Content});
            break;
        }
    } 
    })
    
})



app.listen(process.env.PORT || 3000);

