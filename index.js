const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');
const options = { url: "https://alpha-vantage.p.rapidapi.com/query?datatype=json&keywords=microsoft&function=SYMBOL_SEARCH", headers: { 'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com', 'x-rapidapi-key': 'ea0ce447d8msh2731dc4bc559762p17c644jsndc4e53168ab7' }, json: true };

const PORT = process.env.port || 5000;

//use body parser middleware
app.use(bodyParser.urlencoded({extended: false}))

//create call_api function
function call_api(finishedAPI, ticker) {
    var uri = "https://alpha-vantage.p.rapidapi.com/query?datatype=json&keywords="+ticker+"&function=SYMBOL_SEARCH"
    options.url = uri
    request(options, (error, res, body) => {
        if (error) {
            console.error('Error making request:', error);
            return;
        }
        console.log(res.statusCode);
        if (res.statusCode === 200) {
            //console.log(body);
        var firstobj = body.bestMatches[1]
            finishedAPI(firstobj);
        }
    });
}

//set handlebars middleware
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

const otherStuff = "hello there, this is other stuff!";
//set handlebars index route
app.get('/', function (req, res) {
    call_api(function (doneAPI) {
        res.render('home', { stock: doneAPI });
    }, "goog");
});

//set handlebars index POST route
app.post('/', function (req, res) {
    call_api(function (doneAPI) {
        res.render('home', { stock: doneAPI });
    }, req.body.stock_ticker);
});


//create about page route
app.get('/about.html', function (req, res) {
    res.render('about');
});

//set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('server listening on port ' + PORT));