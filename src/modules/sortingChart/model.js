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

  replaceElement(currentPosition, newPosition) {
    const elements = this.elements.slice(currentPosition, currentPosition + 1);

    this.elements.splice(currentPosition, 1);
    this.elements.splice(newPosition, 0, ...elements);
  }

  swap(idx1, idx2) {
    const temp = this.elementsArray[idx1];

    this.elementsArray[idx1] = this.elementsArray[idx2];
    this.elementsArray[idx2] = temp;
  }
}
