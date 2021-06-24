import { generateArray } from 'helpers';
import Chart from './chart';
import settingsForm from './settingsForm';

class App {
  constructor() {
    this.root = document.getElementById('app');

    this.form = settingsForm;
    this.chart = new Chart();

    this.currentArrayLength = this.form.arrayLength;
    this.currentArray = generateArray(this.currentArrayLength);

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

  submitHandler() {
    this.chart.sort(this.form.sortingType);
  }

  init() {
    this.form.init(this.handlers);
    this.chart.render(this.currentArray);

    return this.root;
  }
}

export default App;
