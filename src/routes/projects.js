import express from 'express';
import User from '../controllers/projects';

const router = express.Router();

router.route('/user/:username').get(User.ownedProjects);

module.exports = router;
