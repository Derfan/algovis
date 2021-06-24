import Chart from './chart';
import settingsForm from './settingsForm';

class SortingApp {
  constructor() {
    this.root = document.getElementById('app');

    this.chart = new Chart();
    this.form = settingsForm;
  }

  get handlers() {
    return [
      { type: 'change', cb: this.chart.update },
      { type: 'submit', cb: this.chart.sort },
    ];
  }

  init() {
    this.form.init(this.handlers);
    this.chart.render({ arrayLength: this.form.arrayLength });

    return this.root;
  }
}

export default new SortingApp();
