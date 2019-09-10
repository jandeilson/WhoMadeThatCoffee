const express = require('express');
const app = express();
const path = require('path');
const paths = require('./paths');

app.use(express.static(path.join(paths.appBuild)));

app.get('/*', function(req, res) {
    res.sendFile('index.html', { root: path.join(paths.appBuild)});
});

app.listen(process.env.PORT || 4000, function(){
    console.log('Your node js server is running');
});