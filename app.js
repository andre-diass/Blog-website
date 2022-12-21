//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash") 

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse.";

const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Mauris ultrices eros in cursus turpis massa tincidunt dui.";

const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. .";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//declare variables
let posts = []

app.get("/", function (req, res) {
   res.render("home" , {startingContent: homeStartingContent, 
   posts: posts})
   
})

app.get("/about", function (req, res) {
  res.render("about" , {startingContent: aboutContent})
})

app.get("/contact", function (req, res) {
  res.render("contact" , {startingContent: contactContent})
})

app.get("/compose", function (req, res) {
  res.render("compose" , {startingContent: contactContent})
})

app.post("/compose" , function (req,res) {
  
  
  let post = {
    title : req.body.titleInput,
    content : req.body.postInput
  };
  
  posts.push(post);
  res.redirect("/")
  
});

//use express route parameters
app.get("/posts/:test", function (req, res) {
  //to lower case the parameter input and take hyphen out using lodash module
  const routeParameter = lodash.lowerCase(req.params.test);
  console.log(routeParameter);
  
  
  posts.forEach(element => {
    let title = element.title.toLowerCase();
    let bodyContent = element.content;
    
    if (title == routeParameter) { 
      res.render("post" , {title:title , body:bodyContent } )
      
    }});
    
    
  
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});



