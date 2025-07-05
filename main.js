// -- Cyclones -- //
class Cyclone {
  constructor(name, maxWind, minPressure) {
    this.name = name;
    this.maxWind = maxWind;
    this.minPressure = minPressure;
  }
}

let cyclones = [];
let selectedCycloneIndex = -1;

// -- GUI -- //
const UI_CONTAINER = document.getElementById('ui-container');

function inputButton(id, label, container) {
  let input = document.createElement('button');
  input.type = 'button';
  input.id = id;
  input.innerText = label;

  container.appendChild(input);
  container.appendChild(document.createElement('br'));
  return input;
}
function inputNumber(id, label, min, max, step, defaultValue, container) {
  let input = document.createElement('input');
  input.type = 'number';
  input.id = id;
  input.min = min;
  input.max = max;
  input.step = step;
  input.value = defaultValue;

  let labelElement = document.createElement('p');
  labelElement.innerText = label;

  container.appendChild(labelElement);
  container.appendChild(input);
  container.appendChild(document.createElement('br'));
  return input;
}
function inputText(id, label, defaultValue, container) {
  let input = document.createElement('input');
  input.type = 'text';
  input.id = id;
  input.value = defaultValue;

  let labelElement = document.createElement('p');
  labelElement.innerText = label;

  container.appendChild(labelElement);
  container.appendChild(input);
  container.appendChild(document.createElement('br'));
  return input;
}

function container() {
  let element = document.createElement('div');
  element.class = 'container';
  
  UI_CONTAINER.appendChild(element);
  return element;
}

const UI_CYCLONE = container();
const UI_CYCLONE_NEWCYCLONE = inputButton('cyclone-new', 'Create New Cyclone', UI_CYCLONE);
const UI_CYCLONE_NAME = inputText('cyclone-name', 'Cyclone Name:', UI_CYCLONE);
const UI_CYCLONE_WINDSPEED = inputNumber('cyclone-windspeed-knots', 'Cyclone Maximum 1-minute-averaged Windspeeds (in knots):', 10, 450, 5, 25, UI_CYCLONE);
const UI_CYCLONE_PRESSURE = inputNumber('cyclone-pressure-mbars', 'Cyclone Minimum Pressure (in mbar/hPa):', 500, 1014, 1, 1010, UI_CYCLONE);
const UI_CYCLONE_CHANGESTATS = inputButton('cyclone-change-stats', 'Change Cyclone Statistics', UI_CYCLONE);

function refresh() {
  UI_CYCLONE_NAME.disabled = (selectedCycloneIndex === -1 || true);
  UI_CYCLONE_WINDSPEED.disabled = (selectedCycloneIndex === -1 || true);
  UI_CYCLONE_PRESSURE.disabled = (selectedCycloneIndex === -1 || true);
  UI_CYCLONE_CHANGESTATS.disabled = (selectedCycloneIndex === -1 || true);
}

UI_CYCLONE_NEWCYCLONE.onclick = function() {
  cyclones.push(new Cyclone(cyclones.length + 1 + '', 25, 1010));
  selectedCycloneIndex = cyclones.length - 1;
  refresh();
}
UI_CYCLONE_CHANGESTATS.onclick = function() {
  if (0 <= selectedCycloneIndex && selectedCycloneIndex < cyclones.length) {
    cyclones[selectedCycloneIndex].name = UI_CYCLONE_NAME.value;
    cyclones[selectedCycloneIndex].maxWind = UI_CYCLONE_WINDSPEED.value;
    cyclones[selectedCycloneIndex].minPressure = UI_CYCLONE_PRESSURE.value;
  }
  refresh();
}
