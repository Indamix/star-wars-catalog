import {memoizePromise} from '../util';

const URL = 'https://swapi.co/api/';

const linkedResources = createPromise => callback => {
  let items = [];

  const fetch = ({next, results}) => {
    if (next) {
      getResource(next).then(fetch);
    }

    items = items.concat(results);
    callback(items);
  };

  createPromise().then(fetch);
};

export const getPeople = linkedResources(() =>
  window.fetch(URL + 'people/').then(toJSON)
);

export const getResource = memoizePromise(url =>
  window.fetch(url).then(toJSON)
);

const toJSON = response => response.json();
