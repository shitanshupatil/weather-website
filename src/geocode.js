const request = require('request')

const getCordinates = (address,callback) => {
    var url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoic2hpdHBhdCIsImEiOiJjandsc28xYnQwcTE4NDNwamxkbHRjamViIn0.ctQJioWxX37IvTaeFYUalw"

    request({
        url: url,
        json:true
    },(error,response)=> {
        if(!error)
        {
            if (!response.body.error)
            {
               // console.log(response.body.features)
                if(response.body.features.length === 0)
                {
                    callback(
                        {
                            error : "Unable to find coordinates"
                        }
                       ,undefined)
                }
                else
            {
                // console.log(response.body.features[0].center[0])
                // console.log(response.body.features[0].center[1])

                // getDetailsFromCoordinates(response.body.features[0].center[0],response.body.features[0].center[1])
                const latitude = response.body.features[0].center[1]
                const longitude = response.body.features[0].center[0]
                const Location = response.body.features[0].place_name
               callback(undefined,{
                   latitude , //Shorthand property 
                   longitude,
                   Location
               })
            }
                
            }
            else
            {
                callback({
                    error :"Unable to find coordinates"
                }
                    ,undefined)
            }
        }
        else{
            console.log("You do not have access to mapbox.com currently")
        }
    
    })

    
    
}


const getUrlFromPlace = (address) => {
    var url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoic2hpdHBhdCIsImEiOiJjandsc28xYnQwcTE4NDNwamxkbHRjamViIn0.ctQJioWxX37IvTaeFYUalw"
    return url
    }



    module.exports = getCordinates