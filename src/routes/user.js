import express from 'express';
import User from '../controllers/user';

const router = express.Router();

router.route('/projects/:username').get(User.ownedProjects);

module.exports = router;
