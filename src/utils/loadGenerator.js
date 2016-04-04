/*
Simulates CPU load
The first alarm should trigger 2 minutes from start
It should resolve 2 minutes 30 seconds from the trigger
 */
const oneMinAvg = [...Array(30).fill(1.1).map(e => Math.random() + e), ...Array(30).fill(0).map(() => Math.random())];

const startIndex = 15;
let oneIndex = startIndex;
let fiveIndex = startIndex;
let fifteenIndex = startIndex;

function* loadGenerator() {
  while (true) {
    yield {
      one: oneMinAvg[oneIndex],
      five: oneMinAvg.slice(fiveIndex - 5, fiveIndex).reduce((p, c) => p + c) / 5,
      fifteen: oneMinAvg.slice(fifteenIndex - 15, fifteenIndex).reduce((p, c) => p + c) / 15
    };

    oneIndex = Math.max(startIndex, (oneIndex + 1) % oneMinAvg.length);
    fiveIndex = Math.max(startIndex, (fiveIndex + 1) % oneMinAvg.length);
    fifteenIndex = Math.max(startIndex, (fifteenIndex + 1) % oneMinAvg.length);
  }
}

export default loadGenerator();
