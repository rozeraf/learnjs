interface User {
  id: number;
  name: string;
}

interface Post {
  id: number;
  title: string;
}
interface PostComment {
  id: number;
  text: string;
}
const checkId = (id: unknown): id is number =>
  typeof id === 'number' &&
  Number.isInteger(id) &&
  Number.isFinite(id) &&
  id > 0;

const getId = (id: number): Promise<User> => {
  return new Promise((resolve, reject) => {
    if (!checkId(id)) {
      reject(new TypeError('Id must be a normal integer'));
      return;
    }
    setTimeout(() => {
      resolve({ id, name: 'User_' + id });
    }, 300);
  });
};
const getPostsByUser = (userId: number): Promise<Post[]> => {
  return new Promise((resolve, reject) => {
    if (!checkId(userId)) {
      reject(new TypeError('Id must be a normal integer'));
      return;
    }
    setTimeout(() => {
      resolve([{ id: 1, title: 'Post by ' + userId }]);
    }, 200);
  });
};
const getCommentsByPost = (postId: number): Promise<PostComment[]> => {
  return new Promise((resolve, reject) => {
    if (!checkId(postId)) {
      reject(new TypeError('Id must be a normal integer'));
      return;
    }
    setTimeout(() => {
      resolve([{ id: 1, text: 'Nice post ' + postId }]);
    }, 100);
  });
};
getId(42)
  .then((user) => getPostsByUser(user.id).then((posts) => ({ user, posts })))
  .then(({ user, posts }) =>
    getCommentsByPost(posts[0].id).then((comments) => ({
      user,
      posts,
      comments,
    })),
  )
  .then(({ user, posts, comments }) => {
    console.log(user.name, posts[0].title, comments[0].text);
  })
  .catch(console.error);
