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

  rect.setAttribute('width', width);
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

export default class SortingChartView {
  constructor() {
    this.root = document.getElementById('chart');
    this.settings = {
      width: 800,
      height: 500,
      transitionDelayMS: 500,
      itemBorderRadius: 10,
      itemBorderColor: '#000000',
      itemBorderWidth: 1,
      itemColorBase: '#0088CC',
      itemColorProcessing: '#F1E409',
      itemColorSuccess: '#06e4ac',
    };
    this.attributeRegExp = /\((.*)\)/;

    this.setUpChart();
  }

  get transitionDelay() {
    return this.settings.transitionDelayMS;
  }

  getElementCoordinates(element) {
    return element.getAttribute('transform').match(this.attributeRegExp)[1].split(', ');
  }

  generateElementsList(values) {
    const { width: containerWidth, height: containerHeight } = this.settings;
    const stroke = 1;

    return values.map((value, idx, arr) => {
      const gapWidth = containerWidth * 0.01;
      const width = (containerWidth - gapWidth * (arr.length + 1)) / arr.length;
      const x = (idx + 1) * gapWidth + idx * width;
      const y = containerHeight - value - stroke;

      return {
        value,
        element: this.createChartElement({
          x, y, width, value,
        }),
      };
    });
  }

  setUpChart() {
    const { width, height } = this.settings;

    this.root.setAttribute('width', width);
    this.root.setAttribute('height', height);
    this.root.setAttribute('viewPort', `0 0 ${width} ${height}`);
  }

  createChartElement({
    x, y, width, value,
  }) {
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
    const textBlock = createSvgText({ value, x: width / 2, y: -5 });

    elementWrapper.appendChild(figure);
    elementWrapper.appendChild(textBlock);
    elementWrapper.style.transition = `transform ${transitionDelayMS / 1000}s`;
    elementWrapper.setAttribute('transform', `translate(${x}, ${y})`);

    return elementWrapper;
  }

  renderChartElements(elements) {
    elements.forEach(({ element }) => this.root.appendChild(element));
  }

  update({ elements }) {
    this.root.innerHTML = '';
    this.renderChartElements(elements);
  }

  swap(element1, element2) {
    const [x1, y1] = this.getElementCoordinates(element1);
    const [x2, y2] = this.getElementCoordinates(element2);

    element1.setAttribute('transform', `translate(${x2}, ${y1})`);
    element2.setAttribute('transform', `translate(${x1}, ${y2})`);
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
    const textElement = createSvgText({ x: this.settings.width / 2, y: 200, value: 'Done!' });

    textElement.style.fontSize = '40px';
    textElement.style.fill = 'red';

    this.root.appendChild(textElement);
  }

  render({ elements }) {
    this.renderChartElements(elements);
  }
}
