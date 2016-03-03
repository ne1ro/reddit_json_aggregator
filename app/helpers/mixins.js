'use strict';

var _ = require('underscore');

_.mixin({
  // Sort ascending or descending by field
  sortAsc: function(values, field, ascending) {
    values = _.sortBy(values, field);

    if (ascending !== 'true') {
      values = values.reverse();
    }

    return values;
  }
});
