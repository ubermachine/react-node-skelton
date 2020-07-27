import User from "../models/user.model";
//import extend from "lodash/extend"; //to be removed
import errorHandler from "./../helpers/dbErrorHandler";
const create = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    return res.status(200).json({ message: "signed Up sucessfully!" });
  } catch (err) {
    return res.status(400).json({ err });
  }
};
const list = async (req, res) => {
  try {
    let users = await User.find().select("name email updated created");
    res.json(users);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};
const userByID = async (req, res, next, id) => {
  try {
    let user = await User.findById(id);
    if (!user)
      return res.status("400").json({
        error: "User not found",
      });
    req.profile = user;
    next();
  } catch (err) {
    return res.status("400").json({ error: "Could not retrieve user" });
  }
};
const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};
const update = async (req, res) => {
  try {
    let user = req.profile;
    // updated to ... or object assign to test
    //user = extend(user, req.body);
    user = Object.assign(user, req.body);
    console.log(user);
    user.updated = Date.now();
    await user.save();
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  } catch (err) {
    return res.status("400").json({ error: errorHandler.getErrorMessage(err) });
  }
};
const remove = async (req, res) => {
  try {
    let user = req.profile;

    let deletedUser = await user.remove();
    deletedUser.hashed_password = undefined;
    deletedUser.profile.salt = undefined;
    res.json(deletedUser);
  } catch (err) {
    return res.status("400").json({ error: errorHandler.getErrorMessage(err) });
  }
};
export default { create, userByID, read, list, remove, update };
