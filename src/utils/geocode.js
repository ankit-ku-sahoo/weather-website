const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYW5raXQta3Utc2Fob28iLCJhIjoiY2t2bDk3enFxMDVhajJycWZ5a20wNmdidCJ9.ojBxitnupc6Tw7RIWUm25Q&limit=1'

    request({ url, json: true}, (error, {body}) => {
        if(error) {
            // console.log('Unable to connect to Geocode service')
            callback('Unable to connect to Geocode service', undefined)
        }
        else if(body.features.length === 0) {
            // console.log('Unable to find location. Try some other keyword')
            callback('Unable to find location. Try some other keyword', undefined)
        }
        else{
            // console.log('The longitude is ' + response.body.features[0].center[0] + ' and latitude is ' + response.body.features[0].center[1])
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode