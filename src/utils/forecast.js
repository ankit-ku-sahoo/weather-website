const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.weatherapi.com/v1/current.json?key=2c6a7d75074544259de165057210411&q=' + latitude + ',' + longitude + '&aqi=yes'

    request({ url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather service', undefined)
        }
        else {
            const data = body.current
            callback(undefined,{
                temp: data.temp_c,
                precipitation: data.precip_mm,
                condition: data.condition.text
            })
        }
    })
}

module.exports = forecast