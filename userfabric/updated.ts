type UserRole = 'user' | 'admin' | 'guest';

class User {
  constructor(public name: string, public readonly role: UserRole = 'user') {}
  info(): string {
    return `${this.role}: ${this.name}`;
  }
  static create({ name, role }: { name: string; role: UserRole }): User {
    return new User(name, role);
  }
}
const u1 = User.create({ name: 'Raf', role: 'admin' });
console.log(u1, '\n', u1.role, '\n', u1.info());
export {};
