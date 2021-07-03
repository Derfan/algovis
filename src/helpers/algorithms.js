export function bubbleSort(array) {
  const result = [...array];
  let lastIdx = result.length - 1;

  while (lastIdx > 0) {
    for (let i = 0; i < lastIdx; i += 1) {
      const n1 = result[i];
      const n2 = result[i + 1];

      if (n2 < n1) {
        result[i] = n2;
        result[i + 1] = n1;
      }
    }

    lastIdx -= 1;
  }

  return result;
}

export function selectionSort(array) {
  return array;
}

export function insertionSort(array) {
  return array;
}

export function mergeSort(array) {
  return array;
}

export function quickSort(array) {
  return array;
}
