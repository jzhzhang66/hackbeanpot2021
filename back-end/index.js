var express = require('express');
var app = express();
var axios = require('axios');

var port = process.env.PORT || 8080;

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Content-Type, X-Requested-With, Origin');
    res.header('Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});

require("./people")(app)
app.listen(port, function () {
    console.log('Our app is running on http://localhost:' + port);
  });