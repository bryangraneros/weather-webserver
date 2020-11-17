const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectortPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectortPath))

app.get('', (req, res)=>{
    res.render('index',{
        title: 'App del Clima',
        name: 'Bryan Graneros'
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title: 'Acerca de mi',
        name: 'Bryan Graneros'
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        title: 'Aiuda',
        name: 'Bryan Graneros',
        helpText: 'Mensaje de aiuda'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Debe proporcionar una dirección'
        })
    }

    geocode(req.query.address, (error, {location, latitud, longitud} = {})=>{
        if(error){
            return res.send({ error })
        }
    
        forecast(latitud,longitud, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }

            res.send({
                address: req.query.address,
                location,
                forecast: forecastData
            })            
        })
    })
    
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'Debe proporcionar un termino de busqueda'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Bryan Graneros',
        errorText:'Help article not found'
    })
})

app.get('*', (req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Bryan Graneros',
        errorMessage:'Page not found'
    })
})

app.listen(port, ()=>{
    console.log('Server is up on port ' + port )
})