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


const compose = function (...args) {
  return function (subject) {
    if (args.length > 1) {
      return compose(...args.slice(0, -1))(tail(args)(subject));
    }

    return args[0](subject);
  };
};

const not = curry((subject) => {
  return !subject;
});

const id = (subject) => subject;

const includesIn = curry((subject, what) => {
  return subject.includes(what);
});

const reduce = curry((fn, seed, subject) => {
  return subject.reduce(fn, seed);
});

const head = curry((subject) => {
  return subject[0];
});

const tail = curry((subject) => {
  return subject[subject.length - 1];
});

const replace = curry((regex, substitute, subject) => {
  return subject.replace(regex, substitute);
});

const prop = curry((property, subject) => {
  return subject[property];
});

const propOf = curry((subject, property) => {
  return subject[property];
});

const keys = curry((subject) => {
  return Object.keys(subject);
});

const values = curry((subject) => {
  return compose(map(propOf(subject)), keys);
});

const eq = curry((what, subject) => {
  return what === subject;
});

const neq = curry((what, subject) => {
  return what !== subject;
});

const fp = {
  compose, curry, not, id, prop, propOf, keys, values,
  eq, neq, includesIn, reduce, head, tail, replace
};

[
  'filter', 'map', 'includes', 'find',
  'findIndex', 'some', 'every', 'concat', 'sort',
  'match', 'split', 'join'
].forEach(fn => {
  fp[fn] = curry((b, a) => {
    return a[fn](b);
  });
});

if (typeof module !== 'undefined' && module.exports) {
  // window.fp = fp;
  module.exports = fp;
} else {
  window.fp = fp;
}
