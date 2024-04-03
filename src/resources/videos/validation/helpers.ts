import { InputVideoBody, UpdateVideoBody } from '../types';
import { ResolutionsEnume } from '../resolutions.enum';
import Validation from './validation';

export const inputValidation = (video: InputVideoBody = {}) => {
  const { title, author, availableResolutions } = video;
  const validation = new Validation();
  validation.title(title).author(author).availableResolutions(availableResolutions);
  return validation.getErrors();
};

export const updateValidation = (video: UpdateVideoBody = {}) => {
  const {
    title,
    author,
    availableResolutions,
    canBeDownloaded,
    minAgeRestriction,
    publicationDate,
  } = video;
  const validation = new Validation();
  validation
    .title(title)
    .author(author)
    .availableResolutions(availableResolutions)
    .canBeDownloaded(canBeDownloaded)
    .minAgeRestriction(minAgeRestriction)
    .publicationDate(publicationDate);

  return validation.getErrors();
};
