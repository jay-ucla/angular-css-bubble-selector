var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
app.listen(8080);
app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
});
