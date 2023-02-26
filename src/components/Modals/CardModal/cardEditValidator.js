const cardEditValidator = (values) => {
  const errors = {};
  if (!values.criteria) {
    errors.criteria = "Criteria is are required";
  }
  if (!values.images) {
    errors.images = "One image minimum is required";
  }
  return errors;
};
export default cardEditValidator;
