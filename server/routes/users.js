var express = require('express');
var fs  = require('fs');
var path = require('path');
//var faker = require("faker");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  	var data = ({
      firstName: 'Tessy',
      lastName: 'Thomas',
      username: 'tessy.maliekkal',
      email: 'tessy@qburst.com'
    });
    res.status(200).send(divisionData);
//    fs.readFile("data/users.json", "utf8", function(err, data){
//       if(err) throw err;
  
//       var resultArray = //do operation on data that generates say resultArray;
  
//       res.send(resultArray);
//   });
   console.log('going to fetch')
   // fs.readFileSync("data/users.json", 'utf8', function (err, data) {
   //    console.log(err, data)
   //    if(err) {
   //       res.status(400);
   //       console.log( err );
   //       throw err;
   //    }
   //    res.status(200).res.send( data );
   // });
});

module.exports = router;
