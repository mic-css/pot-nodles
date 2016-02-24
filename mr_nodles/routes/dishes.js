/*
Alternative to router():

@app.js:
var dishes = require('./dishes.js')(app)

module.exports = function(app) {
  app.get();
  app.post();
}
*/

var express = require('express');
// Returns a router instance which can be mounted as a middleware
var router = express.Router();
var bodyParser = require('body-parser');
// returns a middleware function
var parseUrlencoded = bodyParser.urlencoded({ extended: false }); // extended: false forces use of Node's native query parser module, querystring

var dishes = {
  // Source: http://www.theguardian.com/lifeandstyle/wordofmouth/2013/oct/02/how-to-make-perfect-singapore-noodles
  'Singapore': "Singapore noodles are all but unknown in that country – in fact, they're a Cantonese creation, popular in the restaurants, street stalls and tea houses of Hong Kong. Why they're credited to somewhere else entirely is a mystery.",
  // Source: http://norecipes.com/recipe/yakisoba-recipe
  'Yakisoba': "Yakisoba is perhaps one of Japan's best known street foods and it literally means 'grilled noodles'. If you've ever been to an event in Japan, you probably remember the smell of the fruity, spicy sauce caramelizing on giant teppans (cast iron griddles) with the noodles.",
  // Source: http://www.theguardian.com/lifeandstyle/2016/feb/22/the-rise-and-rise-of-ramen-noodle-soup
  'Ramen': "Ramen, despite its reputation as a cheap fast food, is a complex pillar of modern Japanese society, one loaded with political, cultural and culinary importance that stretches far beyond the circumference of the bowl. And all those big ideas start in Fukuoka, ground zero for the ramen craze."
};

/*
This router is mounted on '/dishes' path in app.js
So all paths are relative
*/
router.route('/')
// Used to be app.get('/dishes', ...) in app.js;
  .get(function (req, res) {
    // Automatically sets status code to 200
    res.json(Object.keys(dishes));
  })
  .post(parseUrlencoded, function (req, res) {
    var newDish = req.body;
    if(newDish.description) {
      dishes[newDish.name] = newDish.description;
      res.status(201).json(newDish.name);
    } else {
      res.status(400).json('Invalid dish'); // Bad request
    }
  });

router.route('/:name')
  // Intercepts requests that contains the arg 'name'
  // Used to be app.param() in app.js
  .all(function (req, res, next) {
    var name = req.params.name;
    var dish = name[0].toUpperCase() + name.slice(1).toLowerCase();

    req.dishName = dish;
    next();
  })
  .get(function (req, res) {
    var description = dishes[req.dishName];
    if (!description) {
      res.status(404).json('Slurp! Nothing found for ' + req.dishName);
    } else {
      res.json(description);
    }
  })
  .delete(function (req, res) {
    delete dishes[req.dishName];
    res.sendStatus(200); // Automatically sets response body to OK
    // Some clients e.g. jQuery don't handle empty responses well
  });

module.exports = router;
