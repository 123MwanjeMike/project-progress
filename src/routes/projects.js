import express from 'express';
import Projects from '../controllers/projects';

const router = express.Router();

router.route('/user/:username').get(Projects.userOwnedPublic);
router.route('/org/:organization_name').get(Projects.organizationWidePublic);

module.exports = router;
