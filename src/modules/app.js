import { generateArray } from 'helpers';
import Chart from './chart';
import settingsForm from './settingsForm';

class SortingApp {
  constructor() {
    this.root = document.getElementById('app');

    this.form = settingsForm;
    this.chart = new Chart();

    this.arrayLength = this.form.arrayLength;
    this.numbersArray = generateArray(this.arrayLength);

    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  get handlers() {
    return [
      { type: 'change', cb: this.changeHandler },
      { type: 'submit', cb: this.submitHandler },
    ];
  }

  changeHandler(arrayLength) {
    this.chart.update(generateArray(arrayLength));
  }

  submitHandler(sortingType) {
    this.chart.sort(sortingType);
  }

  init() {
    this.form.init(this.handlers);
    this.chart.render(this.numbersArray);

    return this.root;
  }
}

export default new SortingApp();
