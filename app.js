const express = require("express")


var app = express()

app.use(express.static("public"))

app.get("/", function (req, res){
  res.sendFile(__dirname + "/index.html")
})

app.get("/trabajos", function(req,res){
  res.sendFile(__dirname + "/trabajos.html")
})

app.listen(3000,function (req,res) {
console.log("Server is running on port 3000")
  })
