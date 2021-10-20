import express from 'express';
import { allColumns, toDoColumn } from '../controllers/columns';

const router = express.Router();

router.get('/:project_id', allColumns);
router.get('/:project_id/todo', toDoColumn);

module.exports = router;
