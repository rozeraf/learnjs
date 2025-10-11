// // method 1
// for (let i = 0; i < 3; i++) {
//   setTimeout(() => {
//     console.log(i);
//   }, 100);
// }
// // method 2
// for (var i = 0; i < 3; i++) {
//   (function (j) {
//     setTimeout(() => console.log(j), 100);
//   })(i);
// }
// // method 3
// function logNumber(num: number) {
//   console.log(num);
// }

// for (var i = 0; i < 3; i++) {
//   const logger = logNumber.bind(null, i);
//   setTimeout(logger, 100);
// }

function createBankAccount(initialBalance: number) {
  let balance = initialBalance;

  return {
    deposit(amount: number): void {
      balance += amount;
    },
    withdraw(amount: number): void {
      if (amount > balance) {
        throw new Error('Not enough balance');
      }
      balance -= amount;
    },
    getBalance(): number {
      return balance;
    },
  };
}
const account = createBankAccount(100);
console.log(`Initial balance: ${account.getBalance()}`);

account.deposit(50);
console.log(`After Deposit: ${account.getBalance()}`);

account.withdraw(30);
console.log(`After withdrowal: ${account.getBalance()}`);

try {
  account.withdraw(200);
} catch (e) {
  if (e instanceof Error) {
    console.log(`Caught expected error: ${e.message}`);
  }
}
