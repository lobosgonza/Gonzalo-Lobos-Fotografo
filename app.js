const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require ("https");

const app = express()


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))

app.get("/", function (req, res){
  res.sendFile(__dirname + "/index.html")
})

app.get("/trabajos", function(req,res){
  res.sendFile(__dirname + "/trabajos.html")
})

app.get("/Newsletter", function(req,res){
  res.sendFile(__dirname + "/signup.html")
})

app.post('/Newsletter', function (req, res){
const nombre = req.body.nombre;
const apellido = req.body.apellido;
const email = req.body.email;

const data = {
  members:[{
    email_address : email,
    status : "subscribed",
    merge_fields : {
      FNAME : nombre,
      LNAME : apellido
    }
  }]
};
const jsonData = JSON.stringify(data);

const url = "https://us10.api.mailchimp.com/3.0/lists/a4c938c26e"

const options = {
  method: "POST",
  auth: "gonzalo1:19e01b454ecb5b8f0ce563dc3104993d-us10"
}

const request = https.request(url, options, function(response){

  var status = response.statusCode
  if ( status === 200 ){
    res.sendFile( __dirname + "/success.html" )
  } else {
      res.sendFile ( __dirname + "/failure.html")}

response.on("data", function(data){
  console.log(status);
})
});

request.write(jsonData);
request.end();

})

app.post("/failure", function(req,res){
  res.redirect( "/Newsletter" )
})



app.listen(process.env.PORT || 3000, function (req,res) {
console.log("Server is running on port 3000")
  })

  
