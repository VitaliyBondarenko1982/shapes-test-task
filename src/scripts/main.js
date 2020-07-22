'use strict';

const canvas = document.getElementById('mycanvas');
const number = document.getElementById('shapes_number');
const area = document.getElementById('shapes_area');
const speed = document.getElementById('shapes_speed');
const gravity = document.getElementById('shapes_gravity');
const decreaseSpeed = document.getElementById('speed_decrease');
const increaseSpeed = document.getElementById('speed_increase');
const decreaseGravity = document.getElementById('gravity_decrease');
const increaseGravity = document.getElementById('gravity_increase');

const state = {
  gravityValue: 1,
  numberOfShapesPerSecond: 1,
  width: window.innerWidth * 0.9,
  height: window.innerHeight * 0.7,
};

const app = new PIXI.Application({
  view: canvas,
  width: state.width,
  height: state.height,
  backgroundColor: 0xFFFFFF,
  resolution: 1,
});

const Graphics = PIXI.Graphics;
const shapes = [];
const shapesTypes = [
  'triangle',
  'rectangle',
  'pentagon',
  'hexagon',
  'circle',
  'ellipse',
  'shape',
];

let renderShapes;

speed.innerText = state.numberOfShapesPerSecond;
gravity.innerText = String(roundNumber(state.gravityValue));
number.innerText = String(shapes.length);
area.innerText = '0';

function createTriangle() {
  const triangle = new Graphics();
  const color = getRandomColor();

  triangle.beginFill(color);
  triangle.drawPolygon(0, 0, -25, 50, 25, 50);
  triangle.endFill();

  triangle.x = randomInt(
    triangle.width, state.width - triangle.width
  );
  triangle.y = -triangle.height;
  triangle.area = Math.round(triangle.height * triangle.width / 2);
  triangle.vy = state.gravityValue;
  triangle.type = 'triangle';
  triangle.interactive = true;
  triangle.buttonMode = true;
  app.stage.addChild(triangle);
  shapes.push(triangle);
};

function createRectangle() {
  const rectangle = new Graphics();
  const color = getRandomColor();

  rectangle.beginFill(color);
  rectangle.drawRect(0, 0, 80, 60);
  rectangle.endFill();

  rectangle.x = randomInt(
    rectangle.width, state.width - rectangle.width
  );
  rectangle.y = -rectangle.height;
  rectangle.area = rectangle.width * rectangle.height;
  rectangle.vy = state.gravityValue;
  rectangle.type = 'rectangle';
  rectangle.interactive = true;
  rectangle.buttonMode = true;
  app.stage.addChild(rectangle);
  shapes.push(rectangle);
};

function createPentagon() {
  const pentagon = new Graphics();
  const color = getRandomColor();
  const radius = 30;
  const numberOfSides = 5;
  pentagon.beginFill(color);
  pentagon.drawRegularPolygon(0, 0, radius, numberOfSides);
  pentagon.endFill();

  pentagon.x = randomInt(
    pentagon.width, state.width - pentagon.width
  );
  pentagon.y = -pentagon.height;
  pentagon.area = Math.round((Math.pow(radius, 2) * numberOfSides  * Math.sin(360 / numberOfSides * Math.PI / 180)) / 2);
  pentagon.vy = state.gravityValue;
  pentagon.type = 'pentagon';
  pentagon.interactive = true;
  pentagon.buttonMode = true;
  app.stage.addChild(pentagon);
  shapes.push(pentagon);
};

function createHexagon() {
  const hexagon = new Graphics();
  const color = getRandomColor();
  const radius = 30;
  const numberOfSides = 6;

  hexagon.beginFill(color);
  hexagon.drawRegularPolygon(0, 0, radius, numberOfSides);
  hexagon.endFill();

  hexagon.x = randomInt(
    hexagon.width, state.width - hexagon.width
  );
  hexagon.y = -hexagon.height;
  hexagon.area = Math.round((Math.pow(radius, 2) * numberOfSides  * Math.sin(360 / numberOfSides * Math.PI / 180)) / 2);
  hexagon.vy = state.gravityValue;
  hexagon.type = 'pentagon';
  hexagon.interactive = true;
  hexagon.buttonMode = true;
  app.stage.addChild(hexagon);
  shapes.push(hexagon);
};

function createCircle() {
  const circle = new Graphics();
  const color = getRandomColor();

  circle.beginFill(color);
  circle.drawCircle(0, 0, 32);
  circle.endFill();

  circle.x = randomInt(
    circle.width / 2, state.width - circle.width / 2
  );
  circle.y = -circle.height / 2;
  circle.area = Math.round(Math.PI * Math.pow(circle.width, 2) / 4);
  circle.vy = state.gravityValue;
  circle.type = 'circle';
  circle.interactive = true;
  circle.buttonMode = true;
  shapes.push(circle);
  app.stage.addChild(circle);
}

function createEllipse() {
  const ellipse = new Graphics();
  const color = getRandomColor();

  ellipse.beginFill(color);
  ellipse.drawEllipse(0, 0, 50, 30);
  ellipse.endFill();

  ellipse.x = randomInt(
    ellipse.width / 2, state.width - ellipse.width / 2
  );
  ellipse.y = -ellipse.height / 2;
  ellipse.area = Math.round(Math.PI * ellipse.width * ellipse.height / 4);
  ellipse.vy = state.gravityValue;
  ellipse.type = 'ellipse';
  ellipse.interactive = true;
  ellipse.buttonMode = true;
  shapes.push(ellipse);
  app.stage.addChild(ellipse);
}

function createShape() {
  const shape = new Graphics();
  const color = getRandomColor();
  const chamfer = 20;
  shape.beginFill(color);
  shape.drawChamferRect(0, 0, 80, 60, -chamfer)
  shape.endFill();

  shape.x = randomInt(
    shape.width, state.width - shape.width
  );
  shape.y = -shape.height;
  shape.area = Math.round(shape.width * shape.height - (Math.PI * Math.pow(chamfer, 2)));
  shape.vy = state.gravityValue;
  shape.type = 'rectangle';
  shape.interactive = true;
  shape.buttonMode = true;
  app.stage.addChild(shape);
  shapes.push(shape);
};

function createShapes() {
  const type = shapesTypes[randomInt(0, shapesTypes.length - 1)];

  switch (type) {
    case 'triangle':
      createTriangle();
      break;
    case 'rectangle':
      createRectangle();
      break;
    case 'pentagon':
      createPentagon();
      break;
    case 'hexagon':
      createHexagon();
      break;
    case 'circle':
      createCircle();
      break;
    case 'ellipse':
      createEllipse();
      break;
    case 'shape':
      createShape();
      break;
    default:
      createRectangle();
  }
}

function getVisibleShapes() {
  const visibleNotRectangleShapes = shapes
    .filter(shape => shape.visible === true
      && (shape.type === 'circle' || shape.type === 'ellipse'))
    .filter(shape => shape.y + shape.height / 2 <= state.height
      && shape.y - shape.height / 2 >= 0);

  const visibleRectangleShapes = shapes
    .filter(shape => shape.visible === true
      && (shape.type !== 'circle' && shape.type !== 'ellipse'))
    .filter(shape => shape.y + shape.height <= state.height && shape.y >= 0);

  return [...visibleNotRectangleShapes, ...visibleRectangleShapes];
}

function calculateAreaOfShapes() {
  const visibleShapes = getVisibleShapes();

  const totalArea = visibleShapes
    .reduce((area, shape) => (area + shape.area), 0);

  return totalArea;
}

function setup() {
  renderShapes = setInterval(() => {
    createShapes();
  }, 1000 / state.numberOfShapesPerSecond);
}

setup();

app.ticker.add(() => {
  for (let i = 0; i < shapes.length; i++) {
    const shape = shapes[i];

    shape.y += shape.vy;
  }
  number.innerText = getVisibleShapes().length;
  area.innerText = calculateAreaOfShapes();
});

// events
function onShapeClick(evt) {
  const { currentTarget } = evt;
  const { x, y } = evt.data.global;

  if (currentTarget) {
    const { type } = currentTarget;

    currentTarget.visible = false;

    const sameTypeShapes = shapes.filter(shape => shape.type === type);

    sameTypeShapes.forEach(shape => {
      shape.tint = getRandomColor();
    });
  } else {
    createShapes();

    const newShape = shapes[shapes.length - 1];

    newShape.x = x;
    newShape.y = y;
  }
}

function decreaseSpeedHandler() {
  state.numberOfShapesPerSecond -= 1;

  if (state.numberOfShapesPerSecond <= 1) {
    state.numberOfShapesPerSecond = 1;
    decreaseSpeed.setAttribute('disabled', 'disabled');
  }

  speed.innerText = state.numberOfShapesPerSecond;
  clearInterval(renderShapes);

  setup();
}

function increaseSpeedHandler() {
  state.numberOfShapesPerSecond += 1;

  if (state.numberOfShapesPerSecond > 1) {
    decreaseSpeed.removeAttribute('disabled');
  }
  speed.innerText = String(Math.round(state.numberOfShapesPerSecond * 10) / 10);
  clearInterval(renderShapes);

  setup();
}

function decreaseGravityHandler() {
  state.gravityValue -= 0.1;

  if (state.gravityValue <= 0) {
    state.gravityValue = 0;
    decreaseGravity.setAttribute('disabled', 'disabled');
  }

  gravity.innerText = String(roundNumber(state.gravityValue));

  shapes.forEach(shape => {
    shape.vy = state.gravityValue;
  });
}

function increaseGravityHandler() {
  state.gravityValue += 0.1;

  if (state.gravityValue > 0) {
    decreaseGravity.removeAttribute('disabled');
  }

  gravity.innerText = String(roundNumber(state.gravityValue));

  shapes.forEach(shape => {
    shape.vy = state.gravityValue;
  });
}

app.renderer.plugins.interaction.on('pointerdown', onShapeClick);
decreaseSpeed.addEventListener('click', decreaseSpeedHandler);
increaseSpeed.addEventListener('click', increaseSpeedHandler);
decreaseGravity.addEventListener('click', decreaseGravityHandler);
increaseGravity.addEventListener('click', increaseGravityHandler);

// helpers
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function roundNumber(value) {
  return Math.round(value * 10) / 10;
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '0x';

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}
