const bodyParser = require("body-parser");
const express = require("express");
const https = require('https');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res) {
  res.sendFile(__dirname+"/index.html"); 
});

app.post("/",function(req,res){
  const city=req.body.cityName;
  const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=630026256d4a10d1c49a655222a85ed9&units=metric";
  https.get(url,function(response){
    response.on("data",function(data){
    const weatherData = JSON.parse(data);
    const temperature = weatherData.main.temp;
    const desc = weatherData.weather[0].description;
    const icon= weatherData.weather[0].icon;
    const imageURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
    res.write("<h1>Temperature in "+city+" : "+temperature+" degree Celcius.</h1>");
    res.write("<p>Weather Desciption : "+desc+"</p>");
    res.write("<img src="+imageURL+">");
    res.send();
    });
  });
});



app.listen(3000,function () {
  console.log("Server with port 3000 started...");
});
