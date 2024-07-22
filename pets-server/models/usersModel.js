const User = require('../models/User')

const getUserByEmailModel = async (email) => {
  try {
    const user = await User.findOne({ email: email })
    return user
  } catch (err) {
    console.log(err)
  }
}

const addUserModel = async (newUser) => {
  try {
    const user = await User.create(newUser)
    return user
  } catch (err) {
    console.log(err)
  }
}


const editUserModel = async (id, editedData) => {
  try {
    const editUser = await User.findByIdAndUpdate(id, editedData, { new: true });
    return editUser;
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
};
const getUserbyIDModel = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
};
module.exports = { getUserByEmailModel, addUserModel, editUserModel, getUserbyIDModel }