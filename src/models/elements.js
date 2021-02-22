class Elements {
  constructor() {
    this.list = [];
  }

  get length() {
    return this.list.length;
  }

  add(element) {
    this.list.push(element);
  }

  updateField(idx, field, value) {
    this.list[idx][field] = value;
  }

  swap(idx1, idx2) {
    const temp = this.list[idx1];

    this.list[idx1] = this.list[idx2];
    this.list[idx2] = temp;
  }

  getIndex(element, from) {
    return this.list.indexOf(element, from);
  }

  getElement(idx) {
    return this.list[idx];
  }
}

export default Elements;
