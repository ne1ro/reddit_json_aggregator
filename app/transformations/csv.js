'use strict';

var _ = require('underscore');
var util = require('util');

// CSV transformation
module.exports = function(values, separator) {
  return values
    .map(function(val) {
      // Wrap strings in quotes
      if (typeof val === 'string' || val instanceof Date) {
        val = util.format('"%s"', val);
      }
      return val;
    })
    .join(separator + ' ');
};
