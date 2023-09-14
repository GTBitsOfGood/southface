import { isValidBlobUrl } from "src/lib/utils/blobStorage";
import { DEFAULT_IMAGE } from "src/lib/utils/constants";

const cardEditValidator = (values) => {
  const errors = {};
  if (!values.title || values.title.length == 0) {
    errors.title = "Title cannot be blank";
  }
  if (!values.criteria || values.criteria.length == 0) {
    errors.criteria = "Criteria cannot be blank";
  }
  if (!values.images) {
    errors.images = "One image minimum is required";
  }
  if (values.images) {
    if (values.images.length == 0) {
      errors.images = "One image minimum is required";
    }
    for (let image of values.images) {
      if (
        !(isValidBlobUrl(image.imageUrl) || image.imageUrl === DEFAULT_IMAGE)
      ) {
        errors.images = "An image has an invalid url";
      }
    }
  }
  if (values.tags) {
    for (let tag of values.tags) {
      if (tag.length == 0) {
        errors.tags = "Cannot add empty tag";
      }
    }
  }
  return errors;
};
export default cardEditValidator;
