import {identity} from './fp';

export const classNames = (...args) => args.filter(identity).join(' ');

export const memoizePromise = fn => {
  const cache = Object.create(null);

  return key =>
    cache[key]
      ? promiseOf(cache[key])
      : fn(key).then(result => {
          cache[key] = result;
          return result;
        });
};

const promiseOf = value =>
  new Promise(resolve => {
    resolve(value);
  });
