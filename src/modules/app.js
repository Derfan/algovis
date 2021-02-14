import { generateArray } from 'helpers';
import Chart from './chart';

class App {
  constructor() {
    this.htmlElements = {
      root: document.getElementById('app'),
      settingsForm: document.getElementById('settings'),
      lengthInput: document.getElementById('arrayLength'),
      lengthText: document.getElementById('currentLength'),
    };

    this.currentArrayLength = this.htmlElements.lengthInput.value;
    this.currentArray = generateArray(this.currentArrayLength);
    this.chart = new Chart();

    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  changeCurrentLength(newValue) {
    const { lengthText } = this.htmlElements;

    lengthText.innerText = newValue;
    this.currentArrayLength = newValue;
    this.currentArray = generateArray(newValue);
  }

  changeHandler(event) {
    event.preventDefault();
    event.stopPropagation();

    this.changeCurrentLength(event.target.value);
    this.chart.update(this.currentArray);
  }

  submitHandler(event) {
    event.preventDefault();
    event.stopPropagation();

    const { sortingType } = event.target.elements;

    this.chart.sort(sortingType.value);
  }

  init() {
    const { lengthInput, settingsForm } = this.htmlElements;

    settingsForm.addEventListener('submit', this.submitHandler);
    lengthInput.addEventListener('change', this.changeHandler);

    this.chart.render(this.currentArray);

    return this.root;
  }
}

export default App;
