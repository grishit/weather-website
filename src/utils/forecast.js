  
  const request = require('request')
  
const forecast = (lat, long, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=6c787797047a72d4411b30ee9ebc7d78&query="+ lat +","+ long +"&units=m";

    request({ url, json: true }, (error, { body }) =>   // using destructuring to use body without calling  response as body is key in response
     {   
        if(error){                                                           
            callback('unable to connect to api', undefined)                                         
        }
        else if(body.error){
            callback('location not found!', undefined)
        }
        else{
            callback(undefined, {
            description: body.current.weather_descriptions,
            temperature: body.current.temperature,  
            feels: body.current.feelslike
        })
        }
    })
}

module.exports={forecast}