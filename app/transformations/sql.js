'use strict';

var util = require('util');

// SQL transformation
module.exports = function(values, dbName, columns) {
  return util.format('INSERT INTO %s (%s) VALUES (%s);', dbName, columns,
    values.map(function(str) {
      return util.format("'%s'", str);
    }).join(', '));
};
