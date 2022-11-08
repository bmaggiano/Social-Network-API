const { Thought, User } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
        .then((thoughtData) => {
            res.status(200).json(thoughtData)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        });
    },
    getSingleThought(req, res) {
        Thought.findOne(
            { _id: req.params.id }
        )
            .then((thoughtData) => {
                if (!thoughtData) {
                return res.status(404).json({ message: 'There is no thought associated with this id!' });
                }
                res.status(200).json(thoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then((thoughtData) => {
                return User.findOneAndUpdate(
                    { _id: req.body.id },
                    { $push: {thoughts: thoughtData._id} },
                    { new: true },
                );
            })
            .then((userData) => {
                if (!userData) {
                  return res.status(404).json({ message: 'Thought was created but no user exists with this id!' });
                }
        
                res.json({ message: 'Thought was created.' });
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
            { runValidators: true, new: true },
        )
            .then((thoughtData) => {
                if (!thoughtData) {
                return res.status(404).json({ message: 'There is no thought associated with this id!' });
                }
                res.status(200).json(thoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.id })
        .then((thoughtData) => {
          if (!thoughtData) {
            return res.status(404).json({ message: 'There is no thought associated with this id!' });
          }
            return User.findOneAndUpdate(
            { thoughts: req.params.id },
            { $pull: { thoughts: req.params.id } },
            { new: true }
          );
        })
        .then((userData) => {
          if (!userData) {
            return res.status(404).json({ message: 'Thought was deleted but no user exists with this id!' });
          }
          res.json({ message: 'Thought was deleted!' });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        })
    },
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
          )
            .then((thoughtData) => {
              if (!thoughtData) {
                return res.status(404).json({ message: 'There is no thought associated with this id!' });
              }
              res.status(200).json(thoughtData);
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json(err);
            });
    },
    removeReaction(req, res) {
        Thought.findOneAndDelete(
            { _id: req.params.id },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
          )
            .then((thoughtData) => {
              if (!thoughtData) {
                return res.status(404).json({ message: 'There is no thought associated with this id!' });
              }
              res.status(200).json(thoughtData);
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json(err);
            });
    }
}