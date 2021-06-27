export default class FormModel {
  constructor() {
    this.elementsCount = 5;
    this.sortingTypeOptions = [
      { label: 'Bubble Sort', value: 'bubbleSort', disabled: false },
      { label: 'Selection Sort', value: 'selectionSort', disabled: true },
      { label: 'Insertion Sort', value: 'insertionSort', disabled: true },
      { label: 'Merge Sort', value: 'mergeSort', disabled: true },
      { label: 'Quick Sort', value: 'quickSort', disabled: true },
    ];
  }

  set arrayLength(value) {
    this.elementsCount = value;
  }

  get arrayLength() {
    return this.elementsCount;
  }

  get sortingOptions() {
    return this.sortingTypeOptions;
  }
}
