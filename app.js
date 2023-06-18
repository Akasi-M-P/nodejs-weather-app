const express = require('express');
const https = require("https");

const bodyParser = require('body-parser');


const app = express();
const port = 7000;
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {

  res.sendFile(__dirname + '/index.html');

})

app.post('/', (req, res) => {

  const query = req.body.cityName;

  const apiKEY = "8b0b2eea029dbf41ee0fa090a3e93b8e";
  const unit = "metric";

  let url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKEY + "&units=" + unit;

  https.get(url, (response) => {
    console.log('statusCode:', response.statusCode);
    console.log('headers:', response.headers);

    response.on('data', function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp
      const weatherDescription = weatherData.weather[0].description
      const weatherIcon = weatherData.weather[0].icon
      const iconURL = " http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
      res.write("<p>The weather is currently " + weatherDescription + "</p>");
      res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius</h1>");
      res.write("<img src=" + iconURL + ">");
      res.send();


    })


  });


})



app.listen(port, () => {
  console.log(`listening on port ${port}`)
});




