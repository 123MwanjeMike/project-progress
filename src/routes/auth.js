import express from 'express';
import Auth from '../controllers/auth';

const router = express.Router();

router.route('/:username').get(Auth.userIdentity);

module.exports = router;
