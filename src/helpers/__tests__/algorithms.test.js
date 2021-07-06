import {
  bubbleSort, selectionSort, insertionSort, mergeSort, quickSort,
} from '../algorithms';

const mock = [
  {
    initial: [3, 77, 9, 13, 30, 83, 92, 86, 10, 51],
    target: [3, 77, 9, 13, 30, 83, 92, 86, 10, 51],
    result: [3, 9, 10, 13, 30, 51, 77, 83, 86, 92],
  },
  {
    initial: [47, 33, 45, 79, 70, 7, 80, 73],
    target: [47, 33, 45, 79, 70, 7, 80, 73],
    result: [7, 33, 45, 47, 70, 73, 79, 80],
  },
  {
    initial: [21, 66, 47, 89, 12, 16, 98],
    target: [21, 66, 47, 89, 12, 16, 98],
    result: [12, 16, 21, 47, 66, 89, 98],
  },
  {
    initial: [76, 32, 85, 9, 71, 33],
    target: [76, 32, 85, 9, 71, 33],
    result: [9, 32, 33, 71, 76, 85],
  },
  {
    initial: [2, 6, 3, 2, 5],
    target: [2, 6, 3, 2, 5],
    result: [2, 2, 3, 5, 6],
  },
];

describe('sorting algorithms', () => {
  describe('bubbleSort', () => {
    test('should sort array without changing prop', () => {
      mock.forEach(({ initial, target, result }) => {
        expect(bubbleSort(target)).toEqual(result);
        expect(target).toEqual(initial);
      });
    });
  });

  describe('selectionSort', () => {
    test('should sort array without changing prop', () => {
      mock.forEach(({ initial, target, result }) => {
        expect(selectionSort(target)).toEqual(result);
        expect(target).toEqual(initial);
      });
    });
  });

  describe('insertionSort', () => {
    test('should sort array without changing prop', () => {
      mock.forEach(({ initial, target, result }) => {
        expect(insertionSort(target)).toEqual(result);
        expect(target).toEqual(initial);
      });
    });
  });

  describe('mergeSort', () => {
    test('should sort array without changing prop', () => {
      mock.forEach(({ initial, target }) => {
        expect(mergeSort(target)).toEqual(initial);
      });
    });
  });

  describe('quickSort', () => {
    test('should sort array without changing prop', () => {
      mock.forEach(({ initial, target }) => {
        expect(quickSort(target)).toEqual(initial);
      });
    });
  });
});
