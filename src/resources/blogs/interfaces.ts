export interface BlogInputData {
  name: string;
  description: string;
  websiteUrl: string;
}

export interface BlogOutputData extends BlogInputData {
  id: string;
}
