var express = require('express');
var router = express.Router();
const axios = require('axios');
var rates ='';
var laureates = [];
var movies = [];


/* GET home page. */
router.get('/', function(req, res, next) {
        axios.get('http://api.nobelprize.org/v1/prize.json')
        .then(res => {
        var prizes = res.data.prizes;
    for (var i in prizes) {
        if(prizes[i].year == "2016" && prizes[i].category == "physics") {
            laureatesTmp = prizes[i].laureates;
            for (var j in laureatesTmp) {
                laureates.push(laureatesTmp[j].firstname + ' ' + laureatesTmp[j].surname);
            }

        }
    }
    console.log(laureates);

}).then(() =>{

        axios.get('http://api.fixer.io/latest?base=EUR')
        .then(res => {
        rates = res.data.rates.GBP;
        console.log(rates);

}).then(() =>{
        movies = [];

    axios.get('https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json')
        .then(res => {
        var moviesR = res.data;
    for (var n in moviesR) {
        if(moviesR[n]["year"] == "1901") {
            var title = moviesR[n].title;
            movies.push(title);
        }
    }
    console.log(movies);
        }).then(() =>{

        res.render('index', { movies: movies, rates: rates, laureates:laureates });

});
});
});
});



module.exports = router;
