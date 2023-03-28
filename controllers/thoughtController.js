const { Thought, User, Reaction } = require('../models');

module.exports = {
  // Get all Thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a Thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.id })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No Thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a Thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId }, // assuming userId is sent in the request body
          { $push: { thoughts: thought._id } },
          { new: true }
        )
      })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'No user found' })
        }
        res.json(user)
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !user
          ? res.status(404).json({ message: 'No thought found!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete a Thought
 deleteThought(req, res) {
  Thought.findOneAndDelete({ _id: req.params.id })
    .then((thought) => {
      if (!thought) {
        return res.status(404).json({ message: 'No Thought with that ID' });
      }
      if (!thought.reactions || thought.reactions.length === 0) {
        return res.json({ message: 'Thought deleted! No reactions found.' });
      }
      return Reaction.deleteMany({ _id: { $in: thought.reactions } })
        .then(() => {
          return res.json({ message: 'Thought and reactions deleted!' });
        });
    })
    .catch((err) => res.status(500).json(err));
},
  // Update a Thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No Thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'No reaction found' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No reaction found' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  }
};

  

//lasvegas@indiecampers.com