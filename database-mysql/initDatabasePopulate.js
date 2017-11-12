var mysql = require('mysql');
var request = require('request');
var Promise = require("bluebird");

var fetch = function(url, callback) {
  var options = {
    type: 'GET',
    url: url
  }
  request(options, function(err, res, body) {
    if (err) {
      callback(err);
    }
    let json = JSON.parse(body);
    callback(null, json);
  });
}

fetch = Promise.promisify(fetch);


var fetchMovesLoop = function(arr, callback) {
    return arr.moves.reduce(function(promise, move) {
        return promise.then(function() {
            return fetch(move.url).done(function(res) {
                callback(res);
            });
        });
    }, Promise.resolve());
}

fetchMovesLoop = Promise.promisify(fetchMovesLoop);

var fetchPokemonLoop = function(arr, callback) {
    return arr.results.reduce(function(promise, pokemon) {
        return promise.then(function() {
            return fetch(pokemon.url).done(function(res) {
                callback(res);
            });
        });
    }, Promise.resolve());
}

var fetchPokemonMovesLoop = function(arr, prom, callback) {
    return arr.reduce(function(promise, pokemon) {
        return promise.then(function() {
            return prom(pokemon.move.name).done(function(res) {
              if (res.length) {
                callback(null, res);
              } else {
                callback()
              }
            });
        });
    }, Promise.resolve());
}

fetchPokemonLoop = Promise.promisify(fetchPokemonLoop);
fetchPokemonMovesLoop = Promise.promisify(fetchPokemonMovesLoop);




module.exports.fetchPokemonMovesLoop = fetchPokemonMovesLoop;
module.exports.fetchPokemonLoop = fetchPokemonLoop;
module.exports.fetchMovesLoop = fetchMovesLoop;
module.exports.fetch = fetch;
