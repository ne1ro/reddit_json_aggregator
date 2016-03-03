'use strict';

var request = require('request');
var _ = require('underscore');
var csv = require('../transformations/csv');
var sql = require('../transformations/sql');
require('../helpers/mixins');

// Aggregate request data by params
module.exports = function(req, response) {
  request(req.body.url, function(err, result, body) {
    var data = _.chain(JSON.parse(body).data.children)
      .pluck('data')
      .groupBy('domain')
      .map(function(val) {
        return {
          domain: val[0].domain,
          articlesCount: val.length,
          // Get summary score
          score: _.reduce(val, function(memo, val) {
            return memo + val.score;
          }, 0)
        };
      })
      .sortAsc('articlesCount', false)
      .map(function(val) {
        var values = _.values(val);

        if (req.body.output_type === 'csv') {
          // Transform to CSV
          return csv(values, req.body.csv_separator);
        } else {
          // Transform to SQL view
          return sql(values, req.body.sql_db, req.body.sql_fields);
        }
      })
      .join('\n')
      .value();

    response.json({
      result: data
    });
  });
};
