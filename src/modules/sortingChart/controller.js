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

    for (let i = 0; i < this.elements.length - 1; i += 1) {
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

    this.view.markAsSorted(this.elements[startIdx].element);
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
