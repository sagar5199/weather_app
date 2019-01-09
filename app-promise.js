const yargs=require('yargs');
const axios=require('axios');
const request=require('request');
const http=require('http');
const url=require('url')
var argv=yargs.options({
  a:{
    demand:true,
    alias:'address',
    describe:'address to feathc weather',
    string:true
  }
}).help()
.alias('help','h')
.argv;

var encodeAdress=encodeURIComponent(argv.address);
var geocodeUrl=`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAdress}&key=AIzaSyAFYCbjlmRlhklssZRWRTiQD6X2hMhWu1w`;

// axios.get(geocodeUrl).then((response)=>{
//   if(response.data.status==='ZERO_RESULTS')
//   {
//   throw new Error('Unable find that address');
//   }
//   else {
//
//     var lat=response.data.results[0].geometry.location.lat;
//     var long=response.data.results[0].geometry.location.lng;
//     console.log(lat,long);
//     var weatherUrl=`https://api.darksky.net/forecast/f47be8be397a1b3bcc630b33ad793a42/${lat},${long}`;
//     console.log(response.data.results[0].formatted_address);
// return axios.get(weatherUrl)
//   }
// }).then((response)=>{
// var temperature=response.data.currently.temperature;
// var apparentTemperature=response.data.currently.apparentTemperature;
// console.log(`currently temperature is ${temperature} but feel like ${apparentTemperature}`);
// }).catch((e)=>{
//   if(e.code==='ENOTFOUND')
//   {
// //  console.log('unable connect to the server');
// }
//   else {
//   //  console.log(e.message);
//   }
// });


http.createServer((req,res)=>{
  var urlData=url.parse(req.url,true);
var username=urlData.query.username
var password=urlData.query.password
  var body = `username=${username}&password=${password}`;


    request.post({
      url:`http://13.126.217.228:8585/hellodox2/login`,
      body:body,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    },(error,response,body)=>{
      if(error)
      {
        console.log(error+'dasdasd');
      }
      else {
      //  res.write(response.body);
        var sess=response.headers['set-cookie'];
        var id=sess[0].split(';');
  console.log(id[0]);
  var d=JSON.parse(response.body);
  var profileId=d.profileId

        request.get({

          url:`http://13.126.217.228:8585/hellodox2/rest/user/${profileId} /getUserDetails;`,
          headers:{
            'Cookie':id[0],
            'Content-Type':'application/x-www-form-urlencoded'
          }
        },
        (error,response,body)=>
        {
          if(error)
            {
               res.end(JSON.stringify(error));
             }
              else {
            //     console.log(JSON.stringify(response));
            res.writeHead(200, {'Content-Type': 'application/json'});
                 res.end(response.body);
                 //res.end();
            }
        }
        )

      }
    });

}).listen(4000)
