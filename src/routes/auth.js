import express from 'express';
import { requestIdentity, userIdentity } from '../controllers/auth';

const router = express.Router();

router.get('/login', requestIdentity);
router.get('/success', userIdentity);

module.exports = router;
