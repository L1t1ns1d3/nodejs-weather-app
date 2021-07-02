const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

// init the app
const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express configs
const PUBLIC_DIR = path.join(__dirname, '../static');
const VIEWS_DIR = path.join(__dirname, '../templates/views');
const PARTIALS_DIR = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', VIEWS_DIR);
hbs.registerPartials(PARTIALS_DIR);

// Setup static directory to serve.
app.use(express.static(PUBLIC_DIR));

// routes
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Ahmed Elhady',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Ahmed Elhady',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help page',
    name: 'Ahmed Elhady',
    msg: 'If you want help, please contact me at:',
    email: 'a.m.elhady@outlook.com',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address)
    return res.send({ error: 'You must provide an address query.' });
  const address = req.query.address;
  geocode(address, (error, { longitude, latitude, location } = {}) => {
    if (error) return res.send({ error });
    forecast(longitude, latitude, (error, forecastData) => {
      if (error) return res.send({ error });
      res.send({
        forecast: forecastData,
        location,
        address,
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMsg: 'Help article is not found.',
    name: 'Ahmed Elhady',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMsg: 'This page is not found.',
    name: 'Ahmed Elhady',
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
