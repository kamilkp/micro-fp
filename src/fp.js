const curry = function (fn) {
  const totalArgs = fn.length;

  function partial(previousArgs) {
    return function curried(...args) {
      const currentArgs = previousArgs.concat(args);
      if (currentArgs.length >= totalArgs) {
        return fn(...currentArgs);
      }

      return partial(currentArgs);
    };
  }

  return partial([]);
};

const filter = curry((fn, subject) => {
  return subject.filter(fn);
});

const map = curry((fn, subject) => {
  return subject.map(fn);
});

const includes = curry((what, subject) => {
  return subject.includes(what);
});

const includesIn = curry((subject, what) => {
  return subject.includes(what);
});

const reduce = curry((fn, seed, subject) => {
  return subject.reduce(fn, seed);
});

const prop = curry((property, subject) => {
  return subject[property];
});

const head = curry((subject) => {
  return subject[0];
});

const tail = curry((subject) => {
  return subject[subject.length - 1];
});

const find = curry((what, subject) => {
  return subject.find(what);
});

const findIndex = curry((what, subject) => {
  return subject.findIndex(what);
});

const some = curry((predicate, subject) => {
  return subject.some(predicate);
});

const every = curry((predicate, subject) => {
  return subject.every(predicate);
});

const sort = curry((sortFn, subject) => {
  return subject.sort(sortFn);
});

const concat = curry((what, subject) => {
  return subject.concat(what);
});

const compose = function (...args) {
  return function (subject) {
    if (args.length > 1) {
      return compose(...args.slice(0, -1))(tail(args)(subject));
    }

    return args[0](subject);
  };
};

const fp = {
  filter, map, includes, includesIn, reduce,
  prop, head, tail, find, findIndex, some,
  every, sort, concat,
  compose, curry
};

if (typeof module !== 'undefined' && module.exports) {
  // window.fp = fp;
  module.exports = fp;
} else {
  window.fp = fp;
}
