export const identity = x => x;

const apply = (value, fn) => fn(value);

export const compose = (...fns) => value => fns.reduceRight(apply, value);
