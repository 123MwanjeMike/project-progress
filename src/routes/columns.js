import express from 'express';
import { allColumns } from '../controllers/columns';

const router = express.Router();

router.get('/:project_id', allColumns);

module.exports = router;
