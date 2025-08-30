export type PostType = {
  _id: string;
  body: string;
  image?: string;
  user: UserType;
  createdAt: string;
  comments: CommentType[];
};

export type UserType = {
  _id: string;
  name: string;
  photo: string;
};

export type CommentType = {
  _id: string;
  content: string;
  commentCreator: UserType;
  post: string;
  createdAt: string;
};

export type SinglePostPropsType = {
  params: {
    id: string;
  };
};

export type AddPostType ={
  body:string,
  image:string
}
