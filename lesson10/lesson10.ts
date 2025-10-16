interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  isAdmin: boolean;
}
const userToUpdatePartial: Partial<User> = {
  name: 'raf',
  age: 14,
};
const updateUser = (id: number, data: Partial<User>) => {
  console.log(id, data);
};
updateUser(0, { name: 'ivan' });
const secureUser: Readonly<User> = {
  id: 1,
  name: 'raf',
  email: 'rafabduloff@gmail.com',
  age: 14,
  isAdmin: false,
};
// secureUser.age = 15;
type UserAvatar = Pick<User, 'id' | 'name'>;
const avatar1: UserAvatar = {
  id: 2,
  name: 'tair',
};
console.log(avatar1);
// or, another case
type OneOrTheOther<T, K extends keyof T> = { [P in K]: Pick<T, P> }[K];
type UserAvatar1 = OneOrTheOther<User, 'id' | 'name'>;
const avatar2: UserAvatar1 = {
  name: 'tair',
};
console.log(avatar2); // this pattern allows to choose only one from all object. not all, not empty, only one.

type PublicUserProfile = Omit<User, 'email' | 'isAdmin'>;
const userprofile: PublicUserProfile = {
  id: 3,
  name: 'abc',
  age: 18,
};
console.log(userprofile);
type Dictionary = Record<string, string>;
const dictrionary1: Dictionary = {
  '1': 'alice',
  '2': 'mark',
};
