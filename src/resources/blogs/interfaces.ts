export interface BlogInputData {
  name: string;
  description: string;
  websiteUrl: string;
}

export interface BlogOutputData {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
  createdAt: Date;
  isMembership: boolean;
}
