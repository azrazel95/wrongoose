//importing our models
const { Thought, User, Reaction } = require('../models');
//exporting our crud functions
module.exports = {
  // Gets all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // gets a thought by id
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
  // posts a new thought and pushes it to the user model
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

 
  // Ddeletes a thought by id
 deleteThought(req, res) {
  Thought.findOneAndDelete({ _id: req.params.id })
    .then((thought) => {
      if (!thought) {
        return res.status(404).json({ message: 'No Thought with that ID' });
      }
      // if it finds reactions, it will delete them. otherwise it will delete the thought but say it couldnt find any. this was aweful
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
 // updates a thought by its id
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
//adds a reaction to the post
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
  // removes a reaction to the post
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

