const DEFAULT_MIN = 1;
const DEFAULT_MAX = 200;
export const DEFAULT_LENGTH = 10;

const getRandomInt = (min = DEFAULT_MIN, max = DEFAULT_MAX) => (
  Math.floor(min + Math.random() * (max + 1 - min))
);

export default (length = DEFAULT_LENGTH) => {
  if (typeof length !== 'number') return null;

  const result = [];

  for (let i = 0; i < length; i += 1) {
    result.push(getRandomInt());
  }

  return result;
};
