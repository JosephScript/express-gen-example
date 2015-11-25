var express = require('express');
var router = express.Router();
var kittehs = require('../data/kittehs.json');
var fs = require('fs');
var path = require('path');

/* GET kittehs listing. */
router.get('/:id?', function(req, res, next) {
  if (req.params.id !== undefined) {
    res.send(kittehs[req.params.id]);
  } else {
    res.send(kittehs);
  }
});

/* POST creates an kitteh and adds it to the json file */
router.post('/', function(req, res, next) {

  // req.body comes from $.ajax data
  var newKitteh = {
    name: req.body.name,
    type: req.body.type
  };

  // push the new element to the array
  kittehs.push(newKitteh);

  // stringify it so that it will write to the array correctly
  var string = JSON.stringify(kittehs);

  // This is the path the file is in
  var filePath = path.join(__dirname, '../data/kittehs.json');

  // write the stringified version to the file
  fs.writeFile(filePath, string, function(err) {
    if (err) {
      // if there is an error, "next" middleware will handle it.
      // Next in our case is the error handler in app.js
      next(err);
    } else {
      // it's all good! Send the object back.
      res.send(newKitteh);
    }
  });
});

// export the router
module.exports = router;
