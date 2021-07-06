function createSvgText({ x, y, value }) {
  const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  const textNode = document.createTextNode(value);

  text.appendChild(textNode);
  text.setAttribute('x', x);
  text.setAttribute('y', y);
  text.setAttribute('text-anchor', 'middle');

  return text;
}

function createSvgFigure({
  width, height, borderRadius, fillColor, strokeColor, strokeWidth, transitionDelay,
}) {
  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

  rect.setAttribute('width', `${width}%`);
  rect.setAttribute('height', height);
  rect.setAttribute('fill', fillColor);
  rect.setAttribute('stroke', strokeColor);
  rect.setAttribute('stroke-width', strokeWidth);
  rect.setAttribute('rx', borderRadius);
  rect.style.transition = `fill ${transitionDelay}s`;

  return rect;
}

function markElement(element, color) {
  const figure = element.querySelector('rect');

  figure.style.fill = color;
}

function percentsToPixels(value, full) {
  return full * value / 100;
}

function pixelsToPercents(value, full) {
  return value / full * 100;
}

export default class SortingChartView {
  constructor() {
    this.root = document.getElementById('chart');
    this.settings = {
      transitionDelayMS: 500,
      itemBorderRadius: 10,
      itemBorderColor: '#000000',
      itemBorderWidth: 1,
      itemColorBase: '#0088CC',
      itemColorProcessing: '#F1E409',
      itemColorSuccess: '#06e4ac',
    };
    this.gapWidth = 0.5;
    this.attributeRegExp = /\((.*)\)/;

    this.setUpChart();
  }

  get transitionDelay() {
    return this.settings.transitionDelayMS;
  }

  get chartSize() {
    return this.root.getBoundingClientRect();
  }

  getElementCoordinates(element) {
    return element.style.transform.match(this.attributeRegExp)[1].split(', ');
  }

  generateElementsList(values) {
    const { height: containerHeight } = this.chartSize;
    const { itemBorderWidth } = this.settings;

    return values.map((value, idx, arr) => {
      const width = (100 - this.gapWidth * (arr.length + 1)) / arr.length;
      const x = (idx + 1) * this.gapWidth + idx * width;
      const y = containerHeight - value - 3 * itemBorderWidth;

      return {
        value,
        element: this.createChartElement({
          x, y, width, value,
        }),
      };
    });
  }

  setUpChart() {
    this.root.setAttribute('width', '95vw');
    this.root.setAttribute('height', '70vh');
  }

  createChartElement({
    x, y, width, value,
  }) {
    const { width: chartWidth } = this.chartSize;
    const {
      itemColorBase, itemBorderRadius, itemBorderWidth, itemBorderColor, transitionDelayMS,
    } = this.settings;
    const elementWrapper = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const figure = createSvgFigure({
      width,
      height: value,
      fillColor: itemColorBase,
      strokeWidth: itemBorderWidth,
      strokeColor: itemBorderColor,
      borderRadius: itemBorderRadius,
      transitionDelay: transitionDelayMS / 1000 / 2,
    });
    const elemWidthInPixels = percentsToPixels(chartWidth, width);
    const textBlock = createSvgText({ value, x: elemWidthInPixels / 2, y: -5 });

    elementWrapper.appendChild(figure);
    elementWrapper.appendChild(textBlock);
    elementWrapper.style.transition = `transform ${transitionDelayMS / 1000}s`;
    elementWrapper.style.transform = `translate(${x}%, ${y}px)`;

    return elementWrapper;
  }

  renderChartElements(elements) {
    elements.forEach(({ element }) => this.root.appendChild(element));
  }

  clearChart() {
    this.root.innerHTML = '';
  }

  update({ elements }) {
    this.clearChart();
    this.renderChartElements(elements);
  }

  swap(element1, element2) {
    const [x1, y1] = this.getElementCoordinates(element1);
    const [x2, y2] = this.getElementCoordinates(element2);

    element1.style.transform = `translate(${x2}, ${y1})`;
    element2.style.transform = `translate(${x1}, ${y2})`;
  }

  moveRight(element, step = 1) {
    const [currentX, y] = this.getElementCoordinates(element);
    const { width: chartWidth } = this.chartSize;
    const { width: elementWidth } = element.getBoundingClientRect();
    const distance = step * (pixelsToPercents(elementWidth, chartWidth) + this.gapWidth);

    element.style.transform = `translate(${parseFloat(currentX) + distance}%, ${y})`;
  }

  moveLeft(element, step = 1) {
    const [currentX, y] = this.getElementCoordinates(element);
    const { width: chartWidth } = this.chartSize;
    const { width: elementWidth } = element.getBoundingClientRect();
    const distance = step * (pixelsToPercents(elementWidth, chartWidth) + this.gapWidth);

    element.style.transform = `translate(${parseFloat(currentX) - distance}%, ${y})`;
  }

  moveUp(element) {
    const [x, y] = this.getElementCoordinates(element);

    element.style.transform = `translate(${x}, ${parseFloat(y) - 300}px)`;
  }

  moveDown(element) {
    const [x, y] = this.getElementCoordinates(element);

    element.style.transform = `translate(${x}, ${parseFloat(y) + 300}px)`;
  }

  markAsProcessing(element) {
    const { itemColorProcessing } = this.settings;

    markElement(element, itemColorProcessing);
  }

  markAsBase(element) {
    const { itemColorBase } = this.settings;

    markElement(element, itemColorBase);
  }

  markAsSorted(element) {
    const { itemColorSuccess } = this.settings;

    markElement(element, itemColorSuccess);
  }

  showSuccessMessage() {
    const textElement = createSvgText({ x: this.chartSize.width / 2, y: this.chartSize.height / 2, value: 'Done!' });

    textElement.style.fontSize = '40px';
    textElement.style.fill = 'red';

    this.root.appendChild(textElement);
  }

  render({ elements }) {
    this.renderChartElements(elements);
  }
}
