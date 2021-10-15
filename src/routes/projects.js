import express from 'express';
import {
  userOwnedPublic,
  organizationWide,
  repositoryProjects,
} from '../controllers/projects';

const router = express.Router();

router.get('/user/:username', userOwnedPublic);
router.get('/org/:organisationName', organizationWide);
router.get('/repo/', repositoryProjects);

module.exports = router;
