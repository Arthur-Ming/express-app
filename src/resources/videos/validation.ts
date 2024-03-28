import { InputVideoBody, OutputErrorsType } from './types';
import { ResolutionsEnume } from './resolutions.enum';

export const inputValidation = (video: InputVideoBody) => {
  const errors: OutputErrorsType = {
    errorsMessages: [],
  };

  if (
    !Array.isArray(video.availableResolutions) ||
    video.availableResolutions.find((p) => !ResolutionsEnume[p])
  ) {
    errors.errorsMessages.push({
      message: 'error!!!!',
      field: 'availableResolution',
    });
  }

  if (
    !video.title ||
    typeof video.title !== 'string' ||
    !video.title.trim() ||
    video.title.length > 40
  ) {
    errors.errorsMessages.push({
      message: 'error!!!!',
      field: 'title',
    });
  }

  if (
    !video.author ||
    typeof video.author !== 'string' ||
    !video.author.trim() ||
    video.author.length > 20
  ) {
    errors.errorsMessages.push({
      message: 'error!!!!',
      field: 'author',
    });
  }
  return errors;
};
