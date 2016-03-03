#!/usr/bin/env node

// Test task #3
'use strict';

var util = require('util');
var entryData = [
  {id: 1, parentId: 0},
  {id: 2, parentId: 0},
  {id: 3, parentId: 1},
  {id: 4, parentId: 1},
  {id: 5, parentId: 2},
  {id: 6, parentId: 4},
  {id: 7, parentId: 5}
];

// Find object by custom field value
function findBy(arr, key, val) {
  key = key || 'id';

  return arr.filter(function(el) {
    return el[key] === val;
  });
};

// Find max parent id from collection
var maxParentId = Math.max.apply(null, entryData.map(function(obj) {
  return obj.parentId;
}));

// Assign children starting from the max parent id
for (var i = maxParentId; i > 0; i--) {
  var children = findBy(entryData, 'parentId', i);
  var parent = findBy(entryData, 'id', i)[0];

  if (children.length) {
    if (parent.children && parent.children.length) {
      parent.children = parent.children.concat(children);
    } else {
      parent.children = children;
    }

    // Remove children from entry data
    var childrenIds = children.map(function(child) {
      return child.id;
    });

    entryData = entryData.filter(function(el) {
      return childrenIds.indexOf(el.id) === -1;
    });
  }
}

console.log(util.inspect(entryData, false, 10, true));
