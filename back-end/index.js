var express = require('express');
var app = express();
var {analyzetone} = require('./analyzetone')
var {main} = require('./spotify')
//var bodyparser = require('body-parser')

var port = process.env.PORT || 8080;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

//app.use(bodyparser)

app.get('/tones', async function (req, res) {
    console.log(req)
    const tones = await analyzetone(req.query.text);
    res.json(tones);
});

app.get('/songs', async function (req, res) {
    console.log(req.query.tone, req.query.artists)
    const songs = await main(JSON.parse(req.query.tone), req.query.artists);
    res.json(songs);
});


app.get('/', async function(req, res) {
    res.json('hello world')
})


app.listen(port, function () {
    console.log('Our app is running on http://localhost:' + port);
});

