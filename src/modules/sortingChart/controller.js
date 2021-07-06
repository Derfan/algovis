import { generateArray, sleep } from 'helpers';

export default class SortingChartController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  set elements(value) {
    this.model.elements = this.view.generateElementsList(value);
  }

  get elements() {
    return this.model.elements;
  }

  shuffle = (numberOfElements) => {
    this.elements = generateArray(+numberOfElements);
    this.view.update({ elements: this.elements });
  }

  async bubbleSort() {
    let lastIdx = this.elements.length - 1;

    while (lastIdx > 0) {
      for (let i = 0; i < lastIdx; i += 1) {
        const [
          { value: n1, element: el1 },
          { value: n2, element: el2 },
        ] = [this.elements[i], this.elements[i + 1]];

        this.view.markAsProcessing(el1);
        this.view.markAsProcessing(el2);

        await sleep(this.view.transitionDelay).then(() => {
          if (n1 > n2) {
            this.model.swap(i, i + 1);
            this.view.swap(el1, el2);
          }
        });

        this.view.markAsBase(el1);
        this.view.markAsBase(el2);
      }
      this.view.markAsSorted(this.elements[lastIdx].element);
      lastIdx -= 1;
    }
    this.view.markAsSorted(this.elements[lastIdx].element);
    this.view.showSuccessMessage();
  }

  async selectionSort() {
    let startIdx = 0;

    while (startIdx < this.elements.length) {
      let selected = { idx: startIdx, ...this.elements[startIdx] };

      for (let j = startIdx; j < this.elements.length; j += 1) {
        const current = { idx: j, ...this.elements[j] };

        this.view.markAsSorted(selected.element);
        this.view.markAsProcessing(current.element);

        await sleep(this.view.transitionDelay).then(() => {
          if (selected.value > current.value) {
            this.view.markAsBase(selected.element);
            selected = current;
            this.view.markAsSorted(selected.element);
          } else {
            this.view.markAsBase(current.element);
          }
        });
      }

      this.view.swap(this.elements[startIdx].element, selected.element);
      this.model.swap(startIdx, selected.idx);

      startIdx += 1;
    }

    this.view.markAsSorted(this.elements[startIdx - 1].element);
    this.view.showSuccessMessage();
  }

  async insertionSort() {
    const sorted = [this.elements[0]];
    const unsorted = [...this.elements.slice(1)];

    this.view.markAsSorted(sorted[0].element);

    while (sorted.length < this.elements.length) {
      const current = unsorted[0];
      let position = sorted.length;

      this.view.moveUp(current.element);
      await sleep(this.view.transitionDelay);

      for (let i = 0; i < sorted.length; i += 1) {
        if (current.value > sorted[i].value) {
          position = i;
          break;
        }
        await sleep(this.view.transitionDelay);
        this.view.moveRight(sorted[i].element);
        this.view.moveLeft(current.element);
      }

      await sleep(this.view.transitionDelay);
      this.view.moveDown(current.element);
      this.view.markAsSorted(current.element);

      unsorted.shift();
      sorted.splice(position, 0, current);
      this.model.replaceElement(this.elements.indexOf(current), position);
    }

    this.view.showSuccessMessage();
  }

  runSorting = (type) => {
    this[type]();
  }

  init({ numberOfElements }) {
    this.elements = generateArray(+numberOfElements);
    this.view.render({ elements: this.elements });
  }
}
