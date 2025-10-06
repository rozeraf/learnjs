function calcDiscount(this: { title: string; price: number }, age: number) {
  age > 60 ? console.log(this.price / 2) : console.log(this.price);
}
const item = { title: 'phone', price: 1000 };
calcDiscount.call(item, 30);
