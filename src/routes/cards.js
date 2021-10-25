import express from 'express';
import { columnCards, numberOfColumnCards } from '../controllers/cards';

const router = express.Router();

router.get('/:column_id', columnCards);
router.get('/:column_id/number', numberOfColumnCards);

module.exports = router;
