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

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);
// /api/Users/:UserId/reactions
router.route('/:UserId/reactions').post(addReaction);

// /api/Users/:UserId/reactions/:reactionId
router.route('/:UserId/reactions/:reactionId').delete(removeReaction);

// /api/thoughts/:thoughtId
router
  .route('/:id')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;
