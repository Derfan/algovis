import generateArray, { DEFAULT_LENGTH } from '../generateArray';

describe('generateArray func', () => {
  test('should generate array with correct length', () => {
    const validValues = [0, 1, 10, 20, 100, 5000];

    validValues.forEach((value) => {
      const array = generateArray(value);

      expect(array.length).toEqual(value);
    });
  });

  test('should return `null`', () => {
    const invalidValues = ['5', {}, []];

    invalidValues.forEach((value) => expect(generateArray(value)).toBeNull());
  });

  test('should return array with default length', () => {
    const array = generateArray();

    expect(array.length).toEqual(DEFAULT_LENGTH);
  });
});
