const router = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const {
  validateCard,
  validateCardById,
} = require('../middlevares/CardValidate');

router.get('/cards', getCards);
router.post('/cards', validateCard, createCard);
router.delete('/cards/:cardId', validateCardById, deleteCard);
router.put('/cards/:cardId/likes', validateCardById, likeCard);
router.delete('/cards/:cardId/likes', validateCardById, dislikeCard);

module.exports = router;
