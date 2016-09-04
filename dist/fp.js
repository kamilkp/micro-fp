(function(){
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var curry = function curry(fn) {
  var totalArgs = fn.length;

  function partial(previousArgs) {
    return function curried() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var currentArgs = previousArgs.concat(args);
      if (currentArgs.length >= totalArgs) {
        return fn.apply(undefined, _toConsumableArray(currentArgs));
      }

      return partial(currentArgs);
    };
  }

  return partial([]);
};

var filter = curry(function (fn, subject) {
  return subject.filter(fn);
});

var map = curry(function (fn, subject) {
  return subject.map(fn);
});

var includes = curry(function (what, subject) {
  return subject.includes(what);
});

var includesIn = curry(function (subject, what) {
  return subject.includes(what);
});

var reduce = curry(function (fn, seed, subject) {
  return subject.reduce(fn, seed);
});

var prop = curry(function (property, subject) {
  return subject[property];
});

var head = curry(function (subject) {
  return subject[0];
});

var tail = curry(function (subject) {
  return subject[subject.length - 1];
});

var find = curry(function (what, subject) {
  return subject.find(what);
});

var findIndex = curry(function (what, subject) {
  return subject.findIndex(what);
});

var some = curry(function (predicate, subject) {
  return subject.some(predicate);
});

var every = curry(function (predicate, subject) {
  return subject.every(predicate);
});

var sort = curry(function (sortFn, subject) {
  return subject.sort(sortFn);
});

var concat = curry(function (what, subject) {
  return subject.concat(what);
});

var compose = function compose() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return function (subject) {
    if (args.length > 1) {
      return compose.apply(undefined, _toConsumableArray(args.slice(0, -1)))(tail(args)(subject));
    }

    return args[0](subject);
  };
};

var fp = {
  filter: filter, map: map, includes: includes, includesIn: includesIn, reduce: reduce,
  prop: prop, head: head, tail: tail, find: find, findIndex: findIndex, some: some,
  every: every, sort: sort, concat: concat,
  compose: compose, curry: curry
};

if (typeof module !== 'undefined' && module.exports) {
  // window.fp = fp;
  module.exports = fp;
} else {
  window.fp = fp;
}

})();