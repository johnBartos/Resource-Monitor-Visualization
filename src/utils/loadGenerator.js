const readings = [2, 2, 0.5, 0.5];
let index = 0;

function* loadGenerator() {
  while (true) {
    yield readings[index];
    index = (index + 1) % readings.length;
  }
}

export default loadGenerator();
