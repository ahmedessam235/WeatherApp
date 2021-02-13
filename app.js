const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, response) {
  response.sendFile(__dirname + "/index.html");

})

app.post("/", function(req, response) {
  const query = req.body.cityName;
  const apiKey = "30b0d1106a489a4aae285f1264119373";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=metric";
  https.get(url, function(res) {


    res.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png" //refer to openweathermap.org for icon documentation
      response.write("<h1>The Temperature in " + query + " is " + temp + " celsius</h1>");
      response.write("<p>The weather description in " + query + " is " + weatherDescription + "</p>");
      response.write("<img src=" + imgURL + ">");
      response.send();
    })

  })
})

app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
