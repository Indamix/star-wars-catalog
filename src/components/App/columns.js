import {compose, identity} from '../../util/fp';

export const createSorter = parse => key => (a, b) =>
  parse(a[key]) > parse(b[key]) ? 1 : -1;

const asString = createSorter(identity);

const notNone = number => (isNaN(number) ? 0 : number);

const asFloat = createSorter(
  compose(
    notNone,
    parseFloat
  )
);

export default [
  {
    key: 'name',
    name: 'Name',
    sorter: asString
  },
  {
    key: 'height',
    name: 'Height, cm',
    sorter: asFloat
  },
  {
    key: 'mass',
    name: 'Mass, kg',
    sorter: asFloat
  },
  {
    key: 'birth_year',
    name: 'Birth Year',
    sorter: asFloat
  }
];
