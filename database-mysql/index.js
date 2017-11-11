var mysql = require('mysql');
var Promise = require("bluebird");
var helpers = require('./initDatabasePopulate.js')

var connection = mysql.createConnection({host: 'localhost', user: 'root', password: '', database: 'pokedex'});

var selectAll = function(tableName, callback) {
  connection.query(`SELECT * FROM ${tableName}`, function(err, results, fields) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var getAllMoves = function(results, url, callback) {
  // if (err) {
  //   console.log(err, 'there was an error connecting to the database')
  //   return;
  // }
  if (!results.length) {
    helpers.fetch(url).then((data) => {
      helpers.fetchLoop(data, (move) => {
        var accuracy = move.accuracy || 100;
        if (move.type.name === 'shadow' || !(move.name && move.damage_class.name && move.power && move.type.name)) {
          return;
        }
        console.log(`${move.name} with a power of ${move.power} with accuracy of ${accuracy}`);
        var queryString = `INSERT INTO moves (name, damage_class, power, accuracy, type)
          VALUES ("${move.name}", "${move.damage_class.name}", ${move.power}, ${accuracy}, "${move.type.name}")`

        connection.query(queryString, function(err, results, fields) {
          if (err) {
            console.log(err);
          } else {
            // console.log('Move added');
          }
        });
      });
      callback();
    })
  }
}

getAllMoves = Promise.promisify(getAllMoves);

selectAll = Promise.promisify(selectAll);

// selectAll('pokemon', function(err, results) {
//   if (err) {
//     console.log(err, 'there was an error connecting to the database')
//     return;
//   }
//   if (!results.length) {
//     helpers.fetch('https://pokeapi.co/api/v2/pokemon/?limit=151').then((data) => {
//       for (var pokemon of data.results) {
//         var queryString = `INSERT INTO pokemon (name, url)
//           VALUES ("${pokemon.name}", "${pokemon.url}")`
//         connection.query(queryString, function(err, results, fields) {
//           if (err) {
//             console.log(err);
//           } else {
//             console.log(results, 'results field');
//           }
//         });
//       }
//       return;
//     }).catch((e) => {
//       console.log(e);
//       return;
//     })
//   }
// })

selectAll('moves').then((data) => {
  getAllMoves(data, 'https://pokeapi.co/api/v2/move-category/0')
  return;
}).catch((e) => {
      console.log(e);
      return;
    })
















// selectAll('moves', function(err, results) {
//   if (err) {
//     console.log(err, 'there was an error connecting to the database')
//     return;
//   }
//   if (!results.length) {
//     helpers.fetch('https://pokeapi.co/api/v2/move-category/0').then((data) => {
//       helpers.fetchLoop(data, (move) => {
//         var accuracy = move.accuracy || 100;
//         if (move.type.name === 'shadow' || !(move.name && move.damage_class.name && move.power && move.type.name)) {
//           return;
//         }
//         console.log(`${move.name} with a power of ${move.power} with accuracy of ${accuracy}`);
//         var queryString = `INSERT INTO moves (name, damage_class, power, accuracy, type)
//           VALUES ("${move.name}", "${move.damage_class.name}", ${move.power}, ${accuracy}, "${move.type.name}")`
//
//         connection.query(queryString, function(err, results, fields) {
//           if (err) {
//             console.log(err);
//           } else {
//             // console.log('Move added');
//           }
//         });
//       });
//
//       return;
//     }).catch((e) => {
//       console.log(e);
//       return;
//     })
//   }
// })


module.exports.selectAll = selectAll;
