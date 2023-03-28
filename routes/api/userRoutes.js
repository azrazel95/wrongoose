// importing our router and controller functions for user
const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  deleteFriend
} = require('../../controllers/UserController');

// /api/Users
// get and post request for user
router.route('/').get(getUsers).post(createUser);

// /api/Users/:UserId
// get put and delete request for user
router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);
// /api/Users/:id/friends/:friendId
// post and delete request for friend
router.route('/:id/friends/:friendid').post(addFriend).delete(deleteFriend);

module.exports = router;
 