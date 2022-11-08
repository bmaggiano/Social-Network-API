const { User, Thought} = require('../models')

module.exports = {
    getUsers(req, res) {
        User.find()
            .then((userData) => {
                res.status(200).json(userData)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            });
    },
    getSingleUser(req, res) {
        User.findOne({
            _id: req.params.id
        })
        .populate('thoughts')
        .populate('friends')
        .then((userData) => {
            if (!userData) {
                res.status(404).json({ message: 'There is no user associated with this ID'})
            }
            res.status(200).json(userData)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        });
    },
    createUser(req, res) {
        User.create(req.body)
            .then((userData) => {
                res.status(200).json(userData)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            });
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true },
        )
            .then((userData) => {
                if (!userData) {
                    res.status(404).json({ message: 'There is no user associated with this ID'})
                }
                res.status(200).json(userData)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            });
    },
    deleteUser(req, res) {
        User.findOneAndDelete(
            { _id: req.params.id }
        )
            .then((userData) => {
                if (!userData) {
                    res.status(404).json({ message: 'There is no user associated with this ID'})
                }
                //TODO: BONUS TO DELETE USER THOUGHTS AS WELL
                res.status(200).json(userData)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            });
    },

    //TODO: BONUS TO ADD FRIEND AND REMOVE FRIEND
}