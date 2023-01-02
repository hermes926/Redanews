// Ref: https://www.simplilearn.com/tutorials/javascript-tutorial/email-validation-in-javascript
const ValidateEmail = (input) => {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (input.match(validRegex)) {
    return true;
  } else {
    return false;
  }
};

export default ValidateEmail;
