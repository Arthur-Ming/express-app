import { ResolutionsEnume } from './resolutions.enum';

export interface InputVideoBody {
  title?: string;
  author?: string;
  availableResolutions?: ResolutionsEnume[];
}

export interface UpdateVideoBody extends InputVideoBody {
  canBeDownloaded?: boolean;
  minAgeRestriction?: number;
  publicationDate?: string;
}

type ErrorMessages = {
  message: string;
  field: string;
};

export type OutputErrorsType = {
  errorsMessages: ErrorMessages[];
};
