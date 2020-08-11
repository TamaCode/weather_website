const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Setup all the gets of the server
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Martin Tamareu'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Martin Tamareu'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Martin Tamareu'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMesage: 'Help article not found',
        name: "Martin Tamareu",
        title: "Error 404"
    });
});

// Defino la API que se utiliza en el Client Side para obtener el Pronostico
app.get('/weather', (req, res) => {
const parameters = req.query;

if (!parameters.address) {
    return res.send({
        error: 'Please provide an address!'
    });
} 
else {
    geocode(parameters.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                location,
                address: parameters.address,
                forecast: forecastData
            });
        });
    });
}
});

app.get('/products', (req, res) => {
    const parameters = req.query;

    if(!parameters.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }
    console.log('req', req.query.rating);
    res.send({
        products: []
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        errorMesage: 'Page not found',
        name: "Martin Tamareu",
        title: "Error 404"
    });
});

// Listening by port 3000
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})