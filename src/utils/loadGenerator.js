const oneMinAvg = [...Array(30).fill(1).map(e => Math.random() + e), ...Array(15).fill(0).map(() => Math.random())];

let oneIndex = 15;
let fiveIndex = 15;
let fifteenIndex = 15;

function* loadGenerator() {
  while (true) {
    yield {
      one: oneMinAvg[oneIndex],
      five: oneMinAvg.slice(fiveIndex - 5, fiveIndex).reduce((p, c) => p + c) / 5,
      fifteen: oneMinAvg.slice(fifteenIndex - 15, fifteenIndex).reduce((p, c) => p + c) / 15
    };

    oneIndex = Math.max(oneIndex, (oneIndex + 1) % oneMinAvg.length);
    fiveIndex = Math.max(fiveIndex, (fiveIndex + 1) % oneMinAvg.length);
    fifteenIndex = Math.max(fifteenIndex, (fifteenIndex + 1) % oneMinAvg.length);
  }
}

export default loadGenerator();
