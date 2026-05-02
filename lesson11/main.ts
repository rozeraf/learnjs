// console.log('smth');
// console.log('end');
// // все последовательно

// console.log('start');
// setTimeout(() => {
//   console.log('delayed');
// }, 1000);
// console.log('end');
// // как я понимаю, ts дает инструкцию в очередь, мол активировать это через 1000 мс.

// const loadData = (callback) => {
//   // шаг 2, тут loadData является функкцией принимающей callback, затем шаг 3
//   setTimeout(() => {
//     const data = { name: 'Raf' };
//     callback(data); // шаг 3, вызывается callback с аргументом объектом data как result.
//   }, 500);
// };
// loadData((result) => {
//   console.log(result.name);
//   // шаг 1, отправная точка, и есть сам коллбек. он принимает аргумент result, и вытаскивает из result значение ключа main и выводит его.
//   // я правильно понимаю что объект data передается как result?
// });

// interface User {
//   id: number;
//   name: string;
// }

// interface Post {
//   id: number;
//   title: string;
// }
// interface PostComment {
//   id: number;
//   text: string;
// }
// const getId = (id: number, callback: (user: User) => void) => {
//   setTimeout(() => {
//     callback({ id, name: 'User_' + id });
//   }, 300);
// };
// const getPostsByUser = (userId: number, callback: (post: Post[]) => void) => {
//   setTimeout(() => {
//     callback([{ id: 1, title: 'Post by ' + userId }]);
//   }, 200);
// };
// const getCommentsByPost = (
//   postId: number,
//   callback: (comment: PostComment[]) => void,
// ) => {
//   setTimeout(() => {
//     callback([{ id: 1, text: 'Nice post ' + postId }]);
//   }, 100);
// };

// getId(42, (user) => {
//   getPostsByUser(user.id, (posts) => {
//     getCommentsByPost(posts[0].id, (comments) => {
//       console.log(user.name, posts[0].title, comments[0].text);
//     });
//   });
// });
