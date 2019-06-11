const request = require('request')


const forecast = (data,callback) => {
    var baseurl = 'https://api.darksky.net/forecast/6df32b32c5098efcc359062e4e03a34b/'
    baseurl = baseurl + data.latitude + ',' + data.longitude
    const url = baseurl

    request({
        url:url,
        json:true
    },
    (error,response)=>{

    if(!error)
        {
           
    const data = response.body
    callback(undefined,
        {
            Summary : data.daily.data[0].summary,
            currentTemperature : data.currently.temperature,
            RainfallProbability : data.currently.precipProbability,
            temperatureHigh : data.daily.data[0].temperatureHigh,
            temperatureLow : data.daily.data[0].temperatureLow
        })
        }
        else if (response.body.error)
        {
            callback(
                {
                    error : "Unable to find Location"
                }, undefined)
        }
        else 
        {
            callback({
                error : "Unable to connect to the service"
            }, undefined)
            console.log("Unable to connect to the service")
        }
    })
}


module.exports = forecast