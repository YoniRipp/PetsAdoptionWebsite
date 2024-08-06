const { addUserModel, editUserModel, getUserbyIDModel,getAllUsersModel } = require('../models/usersModel');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  try {
    const user = await addUserModel(req.body);
    res.send({ ok: true });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const login = async (req, res) => {
  const { password, user } = req.body;
  try {
    bcrypt.compare(password, user.password, (err, result) => {
      if (!result) {
        return res.status(400).send('Incorrect password');
      }
      if (err) {
        return res.status(500).send(err);
      }
      if (result) {
        const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin, firstName: user.firstName, lastName: user.lastName }, process.env.TOKEN_SECRET_KEY, { expiresIn: "1h" });
        res.cookie('token', token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
        res.send({ ok: true, _id: user._id, isAdmin: user.isAdmin, firstName: user.firstName, lastName: user.lastName });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

const checkStatus = (req, res) => {
  try {
    const { _id, firstName, lastName, isAdmin } = req.body;

    res.send({ ok: true, _id, firstName, lastName, isAdmin });
  } catch (err) {
    res.status(500).send(err);
  }
};

const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const editedUser = await editUserModel(id, updates);
    res.status(200).send(editedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersModel();
    res.status(200).send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};
const getUserbyID = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserbyIDModel(id);
    res.status(200).send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};
module.exports = { signup, login, checkStatus, editUser, getUserbyID, getAllUsers };
