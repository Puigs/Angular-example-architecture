var express = require("express");
var serveIndex = require("serve-index");
var app = express();
var port = 3000;
app.use(function (req, res, next) {
    console.log("in middleware");
    next();
});
app.use(express.static("."));
app.use(serveIndex(".", {
    icons: true
}));
app.get("/hello", function (req, res) {
    res.send("Hello World!");
});
app.listen(port, function () {
    console.log("Example app listening at http://localhost:" + port);
});
