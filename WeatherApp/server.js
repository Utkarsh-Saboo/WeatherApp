const express=require('express')
const request = require('request');
const apiKey = '263645f4f2d8c8668dc40d7aa7fe9625';
const app=express()
const bodyparser=require('body-parser')
app.set('view engine','ejs')
app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended:true}));

app.get('/',function(req,res){
res.render('index',{weather:null,error:null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
request(url, function (err, response, body) {
    if(err){console.log(err);
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){console.log(err);
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

/*app.post('/',function(req,res){
let city=req.;

}*/