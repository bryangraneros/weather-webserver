const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYnJ5YW5ncmFuZXJvcyIsImEiOiJja2g2YW9yZWEwMTIwMnlzNGpxbnJvMnRhIn0.MIHvbbmwRV75bI73yJnk7w&limit=1'
    request({url, json:true}, (error,{body})=>{
        if(error){
            callback('No se pudo conectar a los servicios de locacion.', undefined)
        } else if(body.features === undefined){
            callback('No se pudo buscar. Intente con otra busqueda.', undefined)
        } else if(body.features.length === 0){
            callback('No se pudo buscar. Intente con otra busqueda.', undefined)
        } else {
            callback(undefined, {
                latitud:body.features[0].center[1],
                longitud:body.features[0].center[0],
                location:body.features[0].place_name 
            })
        }
    })
}

module.exports = geocode