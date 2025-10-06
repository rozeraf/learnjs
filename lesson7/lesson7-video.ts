const item = {
  title: 'phone',
  logTitle: function () {
    setTimeout(() => {
      console.log(`Product: ${this.title}`);
    });
  },
};
item.logTitle();

// const obj = {
//   lastName: 'ivanov',
//   firstNames: ['petr', 'raf'],
//   logFullNames1: function () {
//     this.firstNames.forEach(function (name) {
//       console.log(`${this.lastName} ${name}`);
//     }, this);
//   },

//   logFullNames2: function () {
//     this.firstNames.forEach((name) => {
//       console.log(`${this.lastName} ${name}`);
//     });
//   },
// };
// obj.logFullNames1();
// obj.logFullNames2();

// const obj = {
//   getThis1: function () {
//     console.log(this);
//   },
//   getThis2: () => {
//     console.log(this);
//   },
// };

// obj.getThis1();
// obj.getThis2();

// class Item {
//   constructor(public title: string, public price: number) {}
// }
// const store: Item[] = [new Item('phone', 1000), new Item('car', 1500)];

// console.log(store);

// function calcDiscount(this: { title: string; price: number }, age: number) {
//   age > 60 ? console.log(this.price / 2) : console.log(this.price);
// }
// const item = { title: 'phone', price: 1000 };
// calcDiscount.call(item, 30);
export {};
