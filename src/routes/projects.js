import express from 'express';
import {
  userOwnedPublic,
  organizationWide,
  repositoryProjects,
} from '../controllers/projects';
import { retrieveInstallationAccessToken } from '../helpers';

const router = express.Router();

router.get('/user/:username', userOwnedPublic);
router.get(
  '/org/:organisationName',
  (req, res, next) => {
    req.login = req.params.organisationName;
    next();
  },
  retrieveInstallationAccessToken,
  organizationWide,
);

router.get(
  '/repo/',
  (req, res, next) => {
    req.login = req.query.owner;
    next();
  },
  retrieveInstallationAccessToken,
  repositoryProjects,
);

module.exports = router;
