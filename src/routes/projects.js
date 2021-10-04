import express from 'express';
import Projects from '../controllers/projects';
import { retrieveInstallationAccessToken } from '../helpers';

const router = express.Router();

router.route('/user/:username').get(Projects.userOwnedPublic);

router.route('/org/:organisationName').get(
  (req, res, next) => {
    req.login = req.params.organisationName;
    next();
  },
  retrieveInstallationAccessToken,
  Projects.organizationWide,
);

router.route('/repo/').get(
  (req, res, next) => {
    req.login = req.query.owner;
    next();
  },
  retrieveInstallationAccessToken,
  Projects.repositoryProjects,
);

module.exports = router;
