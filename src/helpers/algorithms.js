function bubbleSort(array) {
  const result = [...array];
  let lastIdx = result.length - 1;

  while (lastIdx > 0) {
    for (let i = 0; i < lastIdx; i += 1) {
      const n1 = result[i];
      const n2 = result[i + 1];

      if (n1 > n2) {
        result[i] = n2;
        result[i + 1] = n1;
      }
    }

    lastIdx -= 1;
  }

  return result;
}

function selectionSort(array) {
  const result = [...array];
  let startIdx = 0;

  while (startIdx < result.length) {
    let target = result[startIdx];

    for (let i = startIdx; i < result.length; i += 1) {
      const current = result[i];

      if (target > current) {
        target = current;
      }
    }

    const targetIdx = result.indexOf(target, startIdx);
    const temp = result[targetIdx];

    result[targetIdx] = result[startIdx];
    result[startIdx] = temp;

    startIdx += 1;
  }

  return result;
}

function insertionSort(array) {
  const sorted = [array[0]];
  const unsorted = [...array.slice(1)];

  while (sorted.length !== array.length) {
    const current = unsorted[0];
    let position = sorted.length;

    for (let i = sorted.length - 1; i >= 0; i -= 1) {
      if (current < sorted[i]) {
        position -= 1;
      } else {
        break;
      }
    }

    unsorted.shift();
    sorted.splice(position, 0, current);
  }

  return sorted;
}

function mergeSort(array) {
  return array;
}

function quickSort(array) {
  return array;
}

export {
  bubbleSort, selectionSort, insertionSort, quickSort, mergeSort,
};
