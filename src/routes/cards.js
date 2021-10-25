import express from 'express';
import { allCards } from '../controllers/cards';

const router = express.Router();

router.get('/:column_id', allCards);

module.exports = router;
