const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");


const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.listen(3000, function(){
    console.log("Server started on port 3000");
});

app.get("/", function(req, res){
    res.send("Hello World");
})

mongoose.connect("mongodb://localhost:27017/wikiDB");

const articleSchema = {
    title:String,
    content:String
};

const Article = mongoose.model("Article", articleSchema);


//Get all articles
app.get("/articles", function(req, res){
    Article.find({}, function(err, foundArticles){
    if (!err) {
        res.send(foundArticles);
    }
    else {
        console.log(err);
    }
});
});

app.post("/articles", function(req, res){

    const newArticle = new Article({
        title:req.body.title,
        content:req.body.content
    });
    newArticle.save(function(err){
        if(!err){
            res.send("Successfully added a new article");
        }
        else{
            res.send(err);
        }
    });
});

app.delete("/articles", function(req, res){
    Article.deleteMany(function(err){
        if(!err){
            res.send("Successfully deleted all articles");
        }
        else{
            res.send(err);
        }
        }

    )
})

