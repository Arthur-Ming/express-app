import { ResolutionsEnume } from './resolutions.enum';

export type InputVideoBody = {
  title: string;
  author: string;
  availableResolutions: ResolutionsEnume[];
};

type ErrorMessages = {
  message: string;
  field: string;
};

export type OutputErrorsType = {
  errorsMessages: ErrorMessages[];
};
