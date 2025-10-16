interface Post {
  id: number;
  title: string;
  body: string;
  authorId: number;
  createdAt?: Date; // чтобы ts не ргулася на то что в post нету его
}
// q1
// раз не было условия что пользователь может прислать пустоту, значит такое допускать нельзя. сделаем проверку.
// я могу написать на partial, если надо, но это нехорошо со стороны разработчика, он может пустой объект передат
type PostUpdateDto =
  | { title: string; body?: string }
  | { title?: string; body: string };
const updatePost = (data: PostUpdateDto) => {
  if (!data.title && !data.body) {
    throw new Error('you need to pass at least one field');
  }
  // update logic
};
// q2
type PostCard = Pick<Post, 'id' | 'title' | 'authorId'>;

// q3
type NewPostDto = Omit<Post, 'id' | 'createdAt'>;

// q4
const post: Readonly<Post> = {
  id: 0,
  title: '',
  body: '',
  authorId: 0,
};

type PostCache = Record<string, Post>;
