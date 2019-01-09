const request=require('request');

var getWeather=(lat,long,callback)=>
{
request({
  url:`https://api.darksky.net/forecast/f47be8be397a1b3bcc630b33ad793a42/${lat},${long}`,
  json:true
},(error,response,body)=>{
  if(!error && response.statusCode===200)
  {
    callback(undefined,{
      temperature:body.currently.temperature,
      apparentTemperature:body.currently.apparentTemperature
    })

  }else {

      callback("unable connect to the forecast server");
  }

});
}
module.exports={
  getWeather
}
