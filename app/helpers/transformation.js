'use strict';

var _ = require('underscore');
var csv = require('../transformations/csv');
var sql = require('../transformations/sql');

// Transform object to CSV or SQL
module.exports = function(body) {
  return function(obj) {
    // Fix date field
    obj.created_utc = new Date(obj.created_utc * 1000);

    var values = _.chain(obj)
      // Pick required fields
      .pick('id', 'title', 'created_utc', 'score')
      .values()
      .value();

    if (body.output_type === 'csv') {
      // Transform to CSV
      return csv(values, body.csv_separator);
    } else {
      // Transform to SQL view
      return sql(values, body.sql_db, body.sql_fields);
    }
  };
};
