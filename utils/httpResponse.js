const httpStatus500 = (error) => {
  return {
    message: error && error.message ? error.message : "",
    success: false,
  };
};

const httpStatus200 = (content, message) => {
  return {
    data: content,
    message: message,
    success: true,
  };
};

const httpStatus304 = () => {
  return {
    message: "Not Modified",
    success: false,
  };
};

const httpStatus403 = (message) => {
  return {
    message: message || "Not Authorized",
    success: false,
  };
};

module.exports = {
  httpStatus200,
  httpStatus500,
  httpStatus403,
  httpStatus304,
};
