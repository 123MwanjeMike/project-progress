import express from 'express';
import Projects from '../controllers/projects';
import { retrieveInstallationAccessToken } from '../helpers';

const router = express.Router();

router.get('/user/:username', Projects.userOwnedPublic);
router.get(
  '/org/:organisationName',
  (req, res, next) => {
    req.login = req.params.organisationName;
    next();
  },
  retrieveInstallationAccessToken,
  Projects.organizationWide,
);

router.get(
  '/repo/',
  (req, res, next) => {
    req.login = req.query.owner;
    next();
  },
  retrieveInstallationAccessToken,
  Projects.repositoryProjects,
);

module.exports = router;
