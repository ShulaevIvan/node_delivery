const bcrypt = require('bcrypt');

const hashPassword = async (password, saltRounds=10) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);

    return await bcrypt.hash(password, salt);
  } 
  catch (error) {
    return error;
  };
};

module.exports = hashPassword;