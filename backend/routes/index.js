const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlevares/auth');
const { NotFoundError } = require('../errors/NotFoundError');
const { validateLogin, validateUser } = require('../middlevares/UserValidate');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signin', validateLogin, login);
router.post('/signup', validateUser, createUser);

router.use(auth.auth);

router.use(userRouter, cardRouter);

router.all('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
