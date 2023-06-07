const router = require('express').Router();
const {
  getUsers,
  getCurrentUser,
  getUserId,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

const {
  validateUserId,
  validateUpdateUser,
  validateUserAvatar,
} = require('../middlevares/UserValidate');

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);
router.get('/users/:userId', validateUserId, getUserId);
router.patch('/users/me', validateUpdateUser, updateUser);
router.patch('/users/me/avatar', validateUserAvatar, updateAvatar);

module.exports = router;
