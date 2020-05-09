const path =require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const contentDirectory = path.join(__dirname, '../public'); //path for serving static pages
const viewsPath = path.join(__dirname, '../templates/views'); //path for serving dynamic pages
const partialsPath = path.join(__dirname, '../templates/partials'); //path for serving partial pages

const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.set('views', viewsPath); //in case we provide views in some other folder other than'views' folder
hbs.registerPartials(partialsPath);

app.use(express.static(contentDirectory));

app.get('/', (req, res) => {
    res.render('about');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/weather', (req, res) => {
    res.render('weather');
});

app.get('/weatherapi', (req, res) => {
    const address = req.query.address;
    if(!address){
        return res.send({
            error: 'Please provide an address to search for.'
        });
    }    

    geocode(address, (error, {longitude, lattitude} = {}) => {
        if(error){
            return res.send({error});
        }
        forecast(longitude, lattitude, (error, data) => {
            if(error){
                return res.send({error});
            }
            res.send({
                address,
                forecast: data
            })
        });
    });
});

app.get('/help', (req, res) => {
    res.render('help');
});

app.get('/help/*', (req, res) => {
    res.render('error', {
        errorMessage: 'Help resource not found'
    });
});

app.get('*', (req, res) => {
    res.render('error', {
        errorMessage: 'Resource not found'
    });
});

app.listen(port, () => {
    console.log('Server is listening on port', port);
});