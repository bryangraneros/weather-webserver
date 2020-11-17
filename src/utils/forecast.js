const request = require('request')

const forecast = (latitud, longitud, callback) =>{
    const url='http://api.weatherstack.com/current?access_key=8228167fa30507cd106d5d9f8410899c&query=' + latitud + ',' + longitud
    request({url, json:true},(error, {body})=>{
        if(error){
            callback('Error al conectar con el servicio del clima.', undefined)
        }else if(body.error){
            callback('Error al buscar la locación. Intente con otra busqueda.', undefined)
        }else{
            const weather = body.current
            callback(undefined, weather.weather_descriptions[0] + '. La temperatura actual es de ' + weather.temperature + '°C. Con una sensación térmica de ' + weather.feelslike + '°C.')
        }
    })
}

module.exports = forecast