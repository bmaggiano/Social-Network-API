const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
} = require('../../controllers/user-controller')

router.route('/').get(getUsers).post(createUser)

router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser)

//TODO: BONUS FOR ADD FRIEND AND REMOVE FRIEND

module.exports = router;