var mysql = require('mysql');
var Promise = require('bluebird');
var helpers = require('./initDatabasePopulate.js')

var connection = mysql.createConnection({host: 'localhost', user: 'root', password: '', database: 'pokedex'});

var selectAll = function(tableName, queryConstrants, callback) {
  connection.query(`SELECT * FROM ${tableName}` + queryConstrants, function(err, results, fields) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var selectMoveIndex = function(moveName, callback) {
  connection.query(`SELECT id, name FROM moves where name = "${moveName}"`, function(err, results, fields) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var getAllMoves = function(results, url, callback) {
  if (!results.length) {
    helpers.fetch(url).then((data) => {
      return helpers.fetchMovesLoop(data, (move) => {
        var accuracy = move.accuracy || 100;
        if (move.type.name === 'shadow' || !(move.name && move.damage_class.name && move.power && move.type.name)) {
          return;
        }
        console.log(`${move.name} with a power of ${move.power} with accuracy of ${accuracy}`);
        var queryString = `INSERT INTO moves (name, damage_class, power, accuracy, type)
          VALUES ("${move.name}", "${move.damage_class.name}", ${move.power}, ${accuracy}, "${move.type.name}")`

        connection.query(queryString, function(err, results, fields) {
          if (!results) {
          } else {
            console.log('Move added');
          }
        });
      });
      callback();
    })
  } else {
    console.log(`${results.length} moves already in DB!`)
    callback();
  }
}

getAllMoves = Promise.promisify(getAllMoves);
selectAll = Promise.promisify(selectAll);
selectMoveIndex = Promise.promisify(selectMoveIndex);

var getAllPokemon = function(results, url, callback) {
  if (!results.length) {
    helpers.fetch(url).then((data) => {
      return helpers.fetchPokemonLoop(data, (pokemon) => {
        var queryString = `INSERT INTO pokemon (id, name, url)
            VALUES (${pokemon.id}, "${pokemon.name}", "https://pokeapi.co/api/v2/pokemon/${pokemon.id}")`
        connection.query(queryString, function(err, results, fields) {
          if (err) {
            console.log(err);
          } else {
            console.log(`Pokemon # ${pokemon.id}, ${pokemon.name} added successfully!`)
            helpers.fetchPokemonMovesLoop(pokemon.moves, selectMoveIndex, function(err, info) {
              if (info) {
                var query = `INSERT INTO pokemon_moves (id_pokemon, id_moves)
              VALUES (${pokemon.id}, ${info[0].id})`
                connection.query(query, function(err, res, field) {
                  console.log(`${pokemon.name} with move ${info[0].name} Added`)
                })
              } else {
                console.log(err)
              }
            })
          }
        });

      });
      callback();
    })
  } else {
    console.log(`${results.length} pokemon already in DB!`)
    callback();
  }
}
getAllPokemon = Promise.promisify(getAllPokemon);

selectAll('moves', '').then((data) => { // populates database if empty
  return getAllMoves(data, 'https://pokeapi.co/api/v2/move-category/0');
}).then(() => {
  return selectAll('pokemon', '');
}).then((data) => {
  return getAllPokemon(data, 'https://pokeapi.co/api/v2/pokemon/?limit=40');
}).catch((e) => {
  console.log(e);
  return;
})
module.exports.selectAll = selectAll;
