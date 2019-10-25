var express = require('express');
//var faker = require("faker");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  	// var data = ({
   //    firstName: faker.name.firstName(),
   //    lastName: faker.name.lastName(),
   //    username: faker.internet.userName(),
   //    email: faker.internet.email()
   //  });
   //  res.status(200).send(data);
   fs.readFile( data + "/" + "users.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
});

module.exports = router;
