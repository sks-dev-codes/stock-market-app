const express = require('express');
const app = express();
const exphbs = require('express-handlebars')
const path = require('path');

const PORT = process.env.port || 5000;

//set handlebars middleware
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

const otherStuff = "hello there, this is other stuff!"
//set handlebars routes
app.get('/', function (req, res) {
    res.render('home', { stuff: otherStuff });
});
//create about page route
app.get('/about.html', function (req, res) {
    res.render('about');
});

//set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('server listening on port ' + PORT));