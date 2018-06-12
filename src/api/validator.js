const TIMEOUT = 1000;

const existingUsers = [
  'user',
  'test',
  'testuser',
];

window.Api = {
  postRequest(formData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        var valid = true,
            errors = {},
            userName = formData.get('user_name'),
            password = formData.get('password');

        if(!(userName && userName.length)) {
          errors.user_name = errors.user_name || [];
          errors.user_name.push('cannot be blank');
          valid = false;
        }
        else if(existingUsers.indexOf(userName) !== -1) {
          errors.user_name = errors.user_name || [];
          errors.user_name.push('already exists');
          valid = false;
        }

        if(!password) {
          errors.password = errors.password || [];
          errors.password.push('cannot be blank');
          valid = false;
        }
        else {
          if(password.length < 8) {
            errors.password = errors.password || [];
            errors.password.push('must be at least 8 characters');
            valid = false;
          }

          if(!/[0-9]/.test(password)) {
            errors.password = errors.password || [];
            errors.password.push('must have at least one digit');
            valid = false;
          }
        }

        if(valid) {
          resolve({
            userName: userName,
          });
        }
        else {
          reject({
            errors: errors,
          });
        }
      }, TIMEOUT);
    });
  },
};
