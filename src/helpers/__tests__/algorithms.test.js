import {
  bubbleSort, selectionSort, insertionSort, mergeSort, quickSort,
} from '../algorithms';

const mock = [
  { initial: [2, 6, 3, 2, 5], target: [2, 6, 3, 2, 5], result: [2, 2, 3, 5, 6] },
];

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
