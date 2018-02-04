const express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	RawData = require("./data/raw.js");

//Express set-up

app.set("view engine", "ejs")
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

//Routes
app.get("/", function(req,res){
	res.render("index", {rawData: RawData});
})

app.post("/URL", function(req,res){

});


app.listen(3000, function(){
	console.log("Server is running!");
})

