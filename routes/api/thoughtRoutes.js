// importing our router and functions from controller
const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
} = require('../../controllers/thoughtController.js');

// get and post requests
router.route('/').get(getThoughts).post(createThought);
// /api/Users/:UserId/reactions
// post request for reactions
router.route('/:id/reactions').post(addReaction);

// /api/Users/:UserId/reactions/:reactionId
// delete request for reactions
router.route('/:id/reactions/:reactionId').delete(removeReaction);

// /api/thoughts/:thoughtId
// get put and delete requests for thought
router
  .route('/:id')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;
