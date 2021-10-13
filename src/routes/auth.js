import express from 'express';
import Auth from '../controllers/auth';

const router = express.Router();

router.route('/login').get(Auth.requestIdentity);
router.route('/success').get(Auth.userIdentity);

module.exports = router;
