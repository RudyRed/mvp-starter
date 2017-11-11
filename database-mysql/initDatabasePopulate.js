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


var fetchLoop = function(arr, callback) {
    return arr.moves.reduce(function(promise, move) {
        return promise.then(function() {
            return fetch(move.url).done(function(res) {
                callback(res);
            });
        });
    }, Promise.resolve());
}

fetchLoop = Promise.promisify(fetchLoop);

module.exports.fetchLoop = fetchLoop;
module.exports.fetch = fetch;
// module.exports.fetchTypes = Promise.promisify(fetchTypes);
