import FormModel from './model';
import FormView from './view';

class FormController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.htmlElements = {
      form: this.view.htmlForm,
      input: document.getElementById('arrayLength'),
      text: document.getElementById('currentLength'),
    };

    this.callbacks = new Map();

    this.view.sortingTypeOptions = this.model.sortingOptions;

    this.changeArrayLengthHandler = this.changeArrayLengthHandler.bind(this);
    this.submitFormHandler = this.submitFormHandler.bind(this);
  }

  get arrayLength() {
    return this.htmlElements.input.value;
  }

  get sortingType() {
    return this.htmlElements.form.elements.sortingType.value;
  }

  set eventHandlers(handlers) {
    this.callbacks = handlers.reduce(
      (acc, { type, cb }) => (acc.has(type)
        ? acc.set(type, acc.get(type).add(cb))
        : acc.set(type, new Set([cb]))),
      this.callbacks,
    );
  }

  emitCallbacks(type, ...args) {
    const callbackList = this.callbacks.get(type);

    callbackList.forEach((cb) => cb(...args));
  }

  changeArrayLengthHandler(event) {
    event.preventDefault();
    event.stopPropagation();

    const { value } = event.target;

    this.htmlElements.text.innerText = value;
    this.emitCallbacks('change', value);
  }

  submitFormHandler(event) {
    event.preventDefault();
    event.stopPropagation();

    this.emitCallbacks('submit');
  }

  addListeners() {
    this.htmlElements.input.addEventListener('change', this.changeArrayLengthHandler);
    this.htmlElements.form.addEventListener('submit', this.submitFormHandler);
  }

  init(handlers) {
    this.eventHandlers = handlers;
    this.view.render();
    this.addListeners();
  }
}

export default new FormController(new FormModel(), new FormView());
