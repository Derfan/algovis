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

  static inputRangeTemplate({
    min, max, step, value,
  }) {
    return `
      <p class="input-group">
          <label for="arrayLength" class="input-label">
              Amount of Elements:
              <span id="currentLength">10</span>
          </label>
          <input id="arrayLength" name="arrayLength" class="input-field" type="range" min="${min}" max="${max}" step="${step}" value="${value}">
      </p>`;
  }

  static radioButtonTemplate({
    value, label, disabled, selected,
  }) {
    return `
        <li class="options-list-item${disabled ? ' disabled' : ''}">
             <input type="radio" id="${value}" name="sortingType" value="${value}" ${disabled ? 'disabled' : ''} ${selected ? 'checked' : ''}>
             <label for="${value}">${label}</label>
        </li>
    `;
  }

  renderInputRange(value) {
    const inputWrapper = document.createElement('div');

    inputWrapper.innerHTML = FormView.inputRangeTemplate({
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
      (acc, item, idx) => acc + FormView.radioButtonTemplate({ ...item, selected: idx === 0 }),
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

  render(options) {
    this.renderInputRange(options.arrayLength);
    this.renderRadioButtons();
    this.renderSubmitButton();
  }
}
