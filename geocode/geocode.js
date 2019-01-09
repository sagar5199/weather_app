const request=require('request')


var geocodeAddress=(address,callback)=>
{
var encodeAdress=encodeURIComponent(address)
request({
  url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAdress}&key=AIzaSyAFYCbjlmRlhklssZRWRTiQD6X2hMhWu1w`,
  json:true
},
(error,response,body,)=>{
  if(error)
  {
callback("some server problem");
  }
  else if(body.status==='INVALID_REQUEST')
  {
    callback(body.error_message)
  }
  else if(body.status==='ZERO_RESULTS')
  {
    callback("Unable find that address")
  }
  else if(body.status==='OK') {

    callback(undefined,{
      address:body.results[0].formatted_address,
      latitude:body.results[0].geometry.location.lat,
      longitude:body.results[0].geometry.location.lng
    });
  }
});

}

module.exports={
  geocodeAddress
}
