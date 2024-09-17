const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const request = require('request');
const options = { url: "https://alpha-vantage.p.rapidapi.com/query?datatype=json&keywords=microsoft&function=SYMBOL_SEARCH", headers: { 'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com', 'x-rapidapi-key': 'ea0ce447d8msh2731dc4bc559762p17c644jsndc4e53168ab7' }, json: true };

const PORT = process.env.port || 5000;

//create call_api function
function call_api(finishedAPI) {
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
//set handlebars routes
app.get('/', function (req, res) {
    call_api(function (doneAPI) {
        res.render('home', { stock: doneAPI });
    });
});

//create about page route
app.get('/about.html', function (req, res) {
    res.render('about');
});

//set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('server listening on port ' + PORT));