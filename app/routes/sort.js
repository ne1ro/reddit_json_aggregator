'use strict';

var request = require('request');
var _ = require('underscore');
var transform = require('../helpers/transformation');
require('../helpers/mixins');

// Sort request data by params
module.exports = function(req, response) {
  request(req.body.url, function (err, result, body) {
    // Get list of sorted values
    var data = _.chain(JSON.parse(body).data.children)
      .pluck('data')
      .sortAsc(req.body.sort_field, req.body.sort_order)
      .map(transform(req.body))
      .join('\n')
      .value();

    response.json({
      result: data
    });
  });
};
