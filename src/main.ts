const item = {
  title: 'phone',
  fullPrice: 1000,
  calculatePrice(discount: number = 50) {
    console.log(this.fullPrice - (discount / 100) * this.fullPrice);
  },
};
item.calculatePrice();
// const user = {
//   name: 'Alice',
// };
// const id = setInterval(() => console.log('tick'), 1000);
// setTimeout(() => clearInterval(id), 5000);
// setTimeout(() => {
//   console.log(user.name);
// }, 1000);
