export default class SortingChartModel {
  constructor() {
    this.elementsArray = [];
  }

  set elements(value) {
    this.elementsArray = value;
  }

  get elements() {
    return this.elementsArray;
  }

  get arrayOfNumbers() {
    return this.elementsArray.map(({ value }) => value);
  }

  swap(idx1, idx2) {
    const temp = this.elementsArray[idx1];

    this.elementsArray[idx1] = this.elementsArray[idx2];
    this.elementsArray[idx2] = temp;
  }
}
