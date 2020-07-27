/*TO HANDLE VALIDATION ERRORS FROM THE USER MODEL
 including mongoose ones that have error codes ,getUniqueErrorMessage function is to handle errors that are caused due to non unique values*/
const getErrorMessage = (err) => {
  let message = "";
  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = getUniqueErrorMessage(err);
        break;
      default:
        message = "Something went Wrong";
    }
  } else {
    for (let errName in err.errors) {
      if (err.errors[errName].message) {
        message = err.errors[errName].message;
      }
    }
  }
  const getUniqueErrorMessage = (err) => {
    let output;
    try {
      let fieldName = "";
      err.message.substring(
        err.message.lastIndexOf(".$") + 2,
        err.message.lastIndexOf("_1")
      );
      output =
        fieldName.charAt(0).toUpperCase() +
        fieldName.slice(1) +
        "already exists";
    } catch (ex) {
      output = "Unique field already exists";
    }
    return output;
  };
};
export default { getErrorMessage };
