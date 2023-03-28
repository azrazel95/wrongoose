const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../../controllers/UserController');

// /api/Users
router.route('/').get(getUsers).post(createUser);

// /api/Users/:UserId
router.route('/:id').get(getSingleUser).delete(deleteUser);
// /api/Users/:id/friends/:friendId
router.route('/:id/friends/:friendid').post(addFriend).delete(deleteFriend);

module.exports = router;
