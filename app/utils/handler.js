const errorHandler = (e) => {
  const messages = {};

  e.errors.forEach((error) => {
    let message;

    // custom error message based on validatorKey
    switch (error.validatorKey) {
      case 'is_null':
        message = 'Please complete this field';
        break;
      case 'not_unique':
        message = error.value + ' is taken. Please choose another one';
        error.path = error.path.replace('_UNIQUE', '');
    }

    messages[error.path] = message;
  });

  return messages;
};

module.exports = { errorHandler };
