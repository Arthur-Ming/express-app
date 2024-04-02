import { OutputErrorsType, UpdateVideoBody, InputVideoBody } from '../types';
import { ResolutionsEnume } from '../resolutions.enum';

export default class Validation {
  private errors: OutputErrorsType = {
    errorsMessages: [],
  };

  getErrors = () => {
    return this.errors;
  };
  availableResolutions = (field?: InputVideoBody['availableResolutions']) => {
    if (!Array.isArray(field) || !field.length || field.find((p) => !ResolutionsEnume[p])) {
      this.errors.errorsMessages.push({
        message: 'error!!!!',
        field: 'availableResolutions',
      });
    }
    return this;
  };
  title = (field?: InputVideoBody['title']) => {
    if (!field || typeof field !== 'string' || !field.trim() || field.length > 40) {
      this.errors.errorsMessages.push({
        message: 'error!!!!',
        field: 'title',
      });
    }
    return this;
  };
  author = (field?: InputVideoBody['author']) => {
    if (!field || typeof field !== 'string' || !field.trim() || field.length > 20) {
      this.errors.errorsMessages.push({
        message: 'error!!!!',
        field: 'author',
      });
    }
    return this;
  };
  canBeDownloaded = (field?: UpdateVideoBody['canBeDownloaded']) => {
    if (!field || typeof field !== 'boolean') {
      this.errors.errorsMessages.push({
        message: 'error!!!!',
        field: 'canBeDownloaded',
      });
    }
    return this;
  };
  minAgeRestriction = (field?: UpdateVideoBody['minAgeRestriction']) => {
    if (field === null) {
      return this;
    }
    if (!field || typeof field !== 'number' || field > 18 || field < 1) {
      this.errors.errorsMessages.push({
        message: 'error!!!!',
        field: 'minAgeRestriction',
      });
    }
    return this;
  };
  publicationDate = (field?: UpdateVideoBody['publicationDate']) => {
    if (!field || typeof field !== 'string') {
      this.errors.errorsMessages.push({
        message: 'error!!!!',
        field: 'publicationDate',
      });
    }
    return this;
  };
}
