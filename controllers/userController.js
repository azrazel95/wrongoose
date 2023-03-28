//importing our mongoose and models
const { ObjectId } = require('mongoose').Types;
const { User, Thought, Reaction } = require('../models');

// exporting our functions
module.exports = {
  // gets all users
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // gets one user by id
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.id })
      .select('-__v')
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'No user with that ID' });
        }
        return res.json({ user });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // posts a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No User with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // deletes a user
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such user exists' })
          : User.findOneAndUpdate(
              { users: req.params.id },
              { $pull: { users: req.params.id } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'user deleted, but no users found',
            })
          : res.json({ message: 'user successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // adds a friend to the friends list
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { friends: req.params.friendid } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // removes a friend from the friends list
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { friends:req.params.friendid  } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
}