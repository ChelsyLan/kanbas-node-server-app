import userModel from "./model.js";

// data access object
export const createUser = (user) => {
  const newUser = userModel.create(user);
  return newUser;
};


export const findAllUsers = async() => {
  const users = await userModel.find();
  return users;
};
export const findUserByRole = async(role) =>userModel.find({role:role});
export const findUserById = (userId) =>userModel.findById(userId);
export const findUserByUsername = (username) =>  userModel.findOne({ username: username });
export const findUserByCredentials = (username, password) =>  userModel.findOne({ username, password });
export const findUsersByPartialName = (partialName) => {
  const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
  return model.find({
    $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
  });
};

export const updateUser = (userId, user) =>  userModel.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => userModel.deleteOne({ _id: userId });




