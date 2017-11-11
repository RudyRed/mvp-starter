var mysql = require('mysql');
// var $ = require('jquery');
var Promise = require("bluebird");
var populate = require('./initDatabasePopulate.js')

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

selectAll('pokemon', function(err, results) {
  console.log(results)
  console.log(populate.fetchPokemon)
  if (err) {
    console.log(err, 'there was an error connecting to the database')
    return;
  }
  if (!results.length) {
    populate.fetchPokemon().then((data) => {
      for (var pokemon of data) {
        var queryString = `INSERT INTO pokemon (name, url)
          VALUES ("${pokemon.name}", "${pokemon.url}")`
        connection.query(queryString, function(err, results, fields) {
          if (err) {
            console.log(err);
          } else {
            console.log(results, 'results field');
            console.log(`${pokemon.name} was added to the DB!`)
          }
        });
      }
      return;
    }).catch((e) => {
      console.log(e);
      return;
    })
  }

})

module.exports.selectAll = selectAll;
