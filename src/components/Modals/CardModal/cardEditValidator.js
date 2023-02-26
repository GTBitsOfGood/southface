const cardEditValidator = (values) => {
  const errors = {};
  if (!values.notes) {
    errors.tags = "Required";
  }
  if (!values.images) {
    errors.lastName = "One image minimum is required";
  }
  return errors;
};
export default cardEditValidator;
