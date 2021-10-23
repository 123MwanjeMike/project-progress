import express from 'express';
import { allColumns, toDoColumn, doneColumn } from '../controllers/columns';

const router = express.Router();

router.get('/:project_id', allColumns);
router.get('/:project_id/todo', toDoColumn);
router.get('/:project_id/done', doneColumn);

module.exports = router;
