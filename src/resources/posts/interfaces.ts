export interface PostInputData {
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
}

export interface PostOutputData extends PostInputData {
  id: string;
  blogName: string;
}
