let express = require('express');  // CTRL + D 빠른변경 
let app = express();
let request = require('request');
let fs = require('fs');  //code 변경가능 let,  변경불가능 const
let ejs = require('ejs');

let argv = require('yargs').argv;
require('dotenv').config();  //.env 를  쓸수있다.
let apiKey = process.env.OPEN_API_KEY;
let city = argv.c || 'seoul';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
//http://api.openweathermap.org/data/2.5/weather?q=seoul&units=imperial&appid=63645602bcf6c89f37cbd83682b2ebf8
var port = 3000;

app.set('view engine','ejs'); //ejs 엔진
app.listen(port, ()=>{  //서버실행
    console.log("SEVER START at PORT 3000");
})

app.get('/' , (req, res) =>{
    request(url, (err, request, body)=>{  // body -> response.josn
        if(err){
            console.log('error:' + err);
        }
        var weather = JSON.parse(body);
        var message = `지금 온도는 ${weather.main.temp}`;
        console.log(body);
        console.log(weather);
        console.log(message);

        var result = {  // 객체형태로 저장방식
            weatherResult : weather.main.temp,
            weatherMessage : message
        }

        fs.readFile('index.html', 'utf-8', (error, data)=>{
            if(error){
                console.timeLog(error);
            }

            res.send(
                ejs.render(data, {
                    data:result.weatherResult,
                    message:result.weatherMessage,
                    message:(result.weatherMessage - 32) / 1.8
                    
                })
            )
        })

        

        
    })
})

// let argv = require('yargs').argv;
// var fs = require("fs");
// var ejs = require("ejs");
// require('dotenv').config();

// const apiKey = process.env.OPEN_API_KEY;
// let city = argv.c || 'seoul';
// let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

// app.set('view engine', 'ejs');

// app.listen(3000, ()=>{
//     console.log("Server is Starting")
// })

// app.get('/' , (req,res ) =>{
//   request(url, function (err, response, body) {
//     if(err){
//       console.log('error:', error);
     
//     } 

//       let weather = JSON.parse(body)
//       let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
//       console.log(weather.weather)
//       console.log(message);
//       let result = {
//         weather : weather.main,
//         weatherMessage: message
//       }
    

    

//     fs.readFile('test1.html', "utf-8", (error , data)=>{
//       if(error) {
//         console.log("오류"+error);
//         return;
//       }

//       res.send(
//         ejs.render(data, {
//           data : result,
//           message : message
//         })
//       )
//       console.log(result)
//     })
//   });
    
   
// })

// module.exports = app;