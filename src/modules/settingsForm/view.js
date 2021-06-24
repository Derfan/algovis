export default class FormView {
  constructor() {
    this.form = document.getElementById('settings');
  }

  get htmlForm() {
    return this.form;
  }

  set sortingTypeOptions(value) {
    this.sortingOptions = value;
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

  render() {
    this.renderRadioButtons();
    this.renderSubmitButton();
  }
}
