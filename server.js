const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();


hbs.registerPartials(__dirname + '/views/partails');
app.set('view engine', 'hbs');


// app.use((_, response) => {
//   response.render('maintenance.hbs');
// });

app.use((request, response, next)=> {
  var now = new Date().toString();
  var log = `${now}: ${request.method} ${request.url}\n`;
  fs.appendFile('server.log', log,  (err) => {
    if(err){
      console.log('no server log')
    }
  });
  next();
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', text => text.toUpperCase());

app.get('/', (request, response) => {
  response.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome b'
  });

});

app.get('/about', (request, response) => {
  response.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (request, response) => response.send({errorMessage: 'Your request is bad and you should feel bad'}));


app.listen(3000, () => console.log('server is up at port 3000'));
