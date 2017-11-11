var request = require('request');
var Promise = require("bluebird");

var fetchPokemon = function(callback) {
  var options = {
    type: 'GET',
    url: 'https://pokeapi.co/api/v2/pokemon/?limit=151'
  }
  request(options, function(err, res, body) {
    if (err) {
      callback(err);
    }
    let json = JSON.parse(body);
    callback(null, json.results);
  });
}

module.exports.fetchPokemon = Promise.promisify(fetchPokemon);
