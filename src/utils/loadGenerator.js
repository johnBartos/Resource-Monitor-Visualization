const normalLoad = () => Math.random();
const highLoad = () => Math.random() + 1;

const oneMinAvg = [...Array(12).fill(0), ...Array(12).fill(1)];
const fiveMinAvg = [...Array(18).fill(0), ...Array(18).fill(1)];
const fifteenMinAvg = [...Array(24).fill(0), ...Array(24).fill(1)];

let oneIndex = 0;
let fiveIndex = 0;
let fifteenIndex = 0;

function* loadGenerator() {
  while (true) {
    yield {
      one: oneMinAvg[oneIndex] ? highLoad() : normalLoad(),
      five: fiveMinAvg[fiveIndex] ? highLoad() : normalLoad(),
      fifteen: fifteenMinAvg[fifteenIndex] ? highLoad() : normalLoad(),
    };

    oneIndex = (oneIndex + 1) % oneMinAvg.length;
    fiveIndex = (fiveIndex + 1) % fiveMinAvg.length;
    fifteenIndex = (fifteenIndex + 1) % fifteenMinAvg.length;
  }
}

export default loadGenerator();
