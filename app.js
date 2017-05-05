
var r = require("rethinkdb");
var express = require("express");
var bluebird = require("bluebird");
var config = require("./config");
var routes = require('./routes');
var alerts = require('./routes/alerts');
var user = require('./routes/user');
var favicon = require('serve-favicon');
var http = require('http');
var path = require('path');

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.compress());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);			
app.use(express.static(__dirname + "/public"));

app.configure(function(){
	  app.set('port', process.env.PORT || 3000);
	  app.set('views', __dirname + '/views');
	  app.set('view engine', 'ejs');
	  app.use(favicon(__dirname + '/public/img/icon.ico'));
	  app.use(express.logger('dev'));
	  app.use(express.bodyParser());
	  app.use(express.methodOverride());
	  app.use(app.router);
	  app.use(express.static(path.join(__dirname, 'public')));
	});


var feedUrl = "earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";

// Fetch data from the USGS earthquake feed and transform all
// the locations into point objects. Insert the data into the
// `quakes` table. This query is assigned to a variable so it
// can easily be reused in two different parts of the program.
var refresh =
  r.table("quakes").insert(
    r.http(feedUrl)("features").merge(function(item) {
      return {
        geometry: r.point(
          item("geometry")("coordinates")(0),
          item("geometry")("coordinates")(1))
      }
    }), {conflict: "replace"});

// Perform initial setup, creating the database and table
// It also creates a geospatial index on the `geometry` proeprty
// and performs the query above in order to populate the data
var conn;
r.connect(config.database).then(function(c) {
  conn = c;
  return r.dbCreate(config.database.db).run(conn);
})
.then(function() {
  return r.tableCreate("quakes").run(conn);
})
.then(function() {
  return r.table("quakes").indexCreate(
    "geometry", {geo: true}).run(conn);
})
.then(function() { 
  return refresh.run(conn);
})
.error(function(err) {
  if (err.msg.indexOf("already exists") == -1)
    console.log(err);
})
.finally(function() {
  if (conn)
    conn.close();
});

// Use the refresh query above to automatically update the the
// earthquake database with new data at 30 minute intervals and
// delete the records that are older than 30 days
setInterval(function() {
  var conn;
  r.connect(config.database).then(function(c) {
    conn = c;

    return bluebird.join(refresh.run(conn),
      r.table("quakes")
        .filter(r.epochTime(r.row("properties")("time").div(1000)).lt(
         r.now().sub(60 * 60 * 24 * 30))).delete().run(conn));
  })
  .error(function(err) {
    console.log("Failed to refresh:", err);
  })
  .finally(function() {
    if (conn)
      conn.close();
  });
}, 30 * 1000 * 60);

// Define the `/quakes` endpoint for the backend API. It queries
// the database and retrieves the earthquakes ordered by magnitude
// and then returns the output as a JSON array
app.get("/quakes", function(req, res) {
  var conn;
  r.connect(config.database).then(function(c) {
    conn = c;

    return r.table("quakes").orderBy(
      r.desc(r.row("properties")("mag"))).run(conn);
  })
  .then(function(cursor) { return cursor.toArray(); })
  .then(function(result) { res.json(result); })
  .error(function(err) {
    console.log("Error handling /quakes request:", err);
    res.status(500).json({success: false, err: err});
  })
  .finally(function() {
    if (conn)
      conn.close();
  });
});

// Define the `/nearest` endpoint for the backend API. It takes
// two URL query parameters, representing the latitude and longitude
// of a point. It will query the `quakes` table to find the closest
// earthquake, which is returned as a JSON object
app.get("/nearest", function(req, res) {
  var latitude = req.param("latitude");
  var longitude = req.param("longitude");

  if (!latitude || !longitude)
    return res.status(500).json({err: "Invalid Point"});

  var conn;

  r.connect(config.database).then(function(c) {
    conn = c;

    return r.table("quakes").getNearest(
      r.point(parseFloat(longitude), parseFloat(latitude)),
      { index: "geometry", maxDist: 1000, unit: "mi" }).run(conn);
  })
  .then(function(result) { res.json(result); })
  .error(function(err) {
    console.log("Error handling /nearest request:", err);
    res.status(500).json({err: err});
  })
  .finally(function() {
    if (conn)
      conn.close();
  });
});

//app.get('/', routes.index);


app.use(function (req, res, next) {
    if ('/robots.txt' == req.url) {
        res.type('text/plain')
        res.send("User-agent: *\nAllow: /");
    } else {
        next();
    }
});

app.get('/', function(req, res){
	res.sendfile("index.html");
});

app.get('/map', function(req, res){
	res.sendfile("map.html");
});

app.get('/statistics', function(req, res){
	res.sendfile("earthquakes.html");
});

app.get('/disasters', alerts.getDisasters);
app.get('/mapJSON', alerts.getAlertsJSON);
app.get('/disaster-counts', alerts.getDisasterCounts);
app.post('/email-message', user.sendEmail);
app.get('/livemap', function(req, res){
	res.sendfile("public/livemap.html");
});
app.get('/heatmap', function(req, res){
	res.sendfile("heatmap.html");
});
app.get('/globe', function(req, res){
	res.sendfile("globe.html");
});


//app.listen(config.port);
http.createServer(app).listen(app.get('port'), function(){
	  console.log("Express server listening on port " + app.get('port'));
	  alerts.getAlerts(true);
	});
//console.log("Server started on port", config.port);
