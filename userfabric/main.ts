class User {
  constructor(public name: string) {}
  info() {
    return `User: ${this.name}`;
  }
}
class Admin extends User {
  info() {
    return `Admin: ${this.name}`;
  }
}
class Guest extends User {
  info() {
    return `Guest: ${this.name}`;
  }
}
function userFabric(type: string, name: string) {
  switch (type) {
    case 'admin':
      return new Admin(name);
    case 'guest':
      return new Guest(name);
    default:
      return new User(name);
  }
}
const u1 = userFabric('admin', 'Raf');
console.log(u1);
// const u1 = new User('Alex');
// console.log(u1.info());
export {};
