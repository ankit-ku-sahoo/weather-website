const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')

// Lecture 7.2 & 7.3

// app.get('', (req, res) => {
//     res.send('<h1>Hello express!</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Andrew'
//     }, {
//         name: 'Sarah'
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>This is about page!</h1>')
// })

// app.get('/weather', (req, res) => {
//     res.send({
//         forecast: 25,
//         location: 'Cuttack'
//     })
// })

// app.listen(3000, () => {
//     console.log('Server is up on 3000')
// })


// Lecture 7.4


// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Import geocode and forecast functions
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error })
        }

        forecast(latitude,longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }
            return res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

})


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ankit Kumar Sahoo'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ankit Kumar Sahoo'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        message: 'How can we help you?',
        title: 'Help!',
        name: 'Ankit'
    })
})

app.get('/products', (req, res) => {
    // console.log(req.query)
    if(!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    res.send(req.query)
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help!',
        name: 'Ankit',
        msg: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        name: 'Ankit',
        msg: 'Page not Found, 404 ERROR!!'
    })
})


app.listen(3000, () => {
    console.log('Server is up on 3000')
})