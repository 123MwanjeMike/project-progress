import express from 'express';
import {
  singleProject,
  userOwnedPublic,
  organizationWide,
  repositoryProjects,
} from '../controllers/projects';

const router = express.Router();

router.get('/:project_id', singleProject);
router.get('/user/:username', userOwnedPublic);
router.get('/org/:organisationName', organizationWide);
router.get('/repo/', repositoryProjects);

module.exports = router;
