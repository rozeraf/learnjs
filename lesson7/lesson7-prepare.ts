function introduce(
  this: { name: string },
  profession: string,
  country: string,
) {
  console.log(
    `Hello, my name is ${this.name}, i'm a ${profession} from ${country}`,
  );
}

const user1 = { name: 'raf' };
introduce.call(user1, 'coder', 'kazakhstan');

const user2 = { name: 'maria' };
const userInfo: [string, string] = ['designer', 'spain'];
introduce.apply(user2, userInfo);

const introduceRaf = introduce.bind(user1);
introduceRaf('student', 'russia');

const item1 = {
  title: 'phone',
  fullPrice: 1000,
  calculatePrice(discount: number = 50) {
    console.log(this.fullPrice - (discount / 100) * this.fullPrice);
  },
};
item1.calculatePrice();

// const user = {
//   name: 'Alice',
// };
// const id = setInterval(() => console.log('tick'), 1000);
// setTimeout(() => clearInterval(id), 5000);
// setTimeout(() => {
//   console.log(user.name);
// }, 1000);
export {};
