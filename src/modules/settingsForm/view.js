import templates from './templates';

export default class FormView {
  constructor() {
    this.form = document.getElementById('settings');
    this.input = null;
    this.lengthText = null;
  }

  set htmlForm(value) {
    this.form = value;
  }

  get htmlForm() {
    return this.form;
  }

  set lengthInput(value) {
    this.input = value;
  }

  get lengthInput() {
    return this.input;
  }

  set lengthTextNode(value) {
    this.lengthText = value;
  }

  get lengthTextNode() {
    return this.lengthText;
  }

  set sortingTypeOptions(value) {
    this.sortingOptions = value;
  }

  renderInputRange(value) {
    const inputWrapper = document.createElement('div');

    inputWrapper.innerHTML = templates.inputRangeTemplate({
      min: 2, step: 1, max: 50, value,
    });
    this.form.appendChild(inputWrapper);
    this.lengthInput = document.getElementById('arrayLength');
    this.lengthText = document.getElementById('currentLength');
  }

  renderRadioButtons() {
    const list = document.createElement('ul');

    list.classList.add('options-list');
    list.innerHTML = this.sortingOptions.reduce(
      (acc, item, idx) => acc + templates.radioButtonTemplate({ ...item, selected: idx === 0 }),
      '',
    );
    this.form.appendChild(list);
  }

  renderSubmitButton() {
    const button = document.createElement('button');

    button.innerText = 'Start Sorting';
    button.classList.add('button');
    this.form.appendChild(button);
  }

  render({ arrayLength }) {
    this.renderInputRange(arrayLength);
    this.renderRadioButtons();
    this.renderSubmitButton();
  }
}
