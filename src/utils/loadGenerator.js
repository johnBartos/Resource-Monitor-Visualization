const readings = [1, 2, 3, 4];
let index = 0;

function* loadGenerator() {
  while (true) {
    yield readings[index];
    index = (index + 1) % readings.length;
  }
}

export default loadGenerator();
