// method 1
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 100);
}
// method 2
for (var i = 0; i < 3; i++) {
  (function (j) {
    setTimeout(() => console.log(j), 100);
  })(i);
}
// method 3
function logNumber(num: number) {
  console.log(num);
}

for (var i = 0; i < 3; i++) {
  const logger = logNumber.bind(null, i);
  setTimeout(logger, 100);
}
