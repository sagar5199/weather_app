
const yargs=require('yargs')
const geocode=require('./geocode/geocode')
const weather=require('./weather/weather')
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

geocode.geocodeAddress(argv.address,(errorMessage,result)=>{
  if(errorMessage)
  {
    console.log(errorMessage+"err");
  }else {

console.log(result)

    weather.getWeather(result.latitude,result.longitude,(errorMessage,weatherResult)=>
    {
      if(errorMessage)
      {
        console.log(errorMessage);
      }
      else {
        {
          console.log(`currently weather temperature is ${weatherResult.temperature},${weatherResult.apparentTemperature}`);
        }
      }
    });
  }
})
