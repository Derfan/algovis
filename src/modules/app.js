import sortingChart from './sortingChart';
import settingsForm from './settingsForm';

class SortingApp {
  constructor() {
    this.root = document.getElementById('app');

    this.sortingChart = sortingChart;
    this.form = settingsForm;
  }

  get handlers() {
    return [
      { type: 'change', cb: this.sortingChart.shuffle },
      { type: 'submit', cb: this.sortingChart.runSorting },
    ];
  }

  init() {
    this.sortingChart.init({ numberOfElements: this.form.arrayLength });
    this.form.init({ callbacks: this.handlers });

    return this.root;
  }
}

export default new SortingApp();
