import express from 'express';
import Projects from '../controllers/projects';
import { retrieveInstallationAccessToken } from '../helpers';

const router = express.Router();

router.route('/user/:username').get(Projects.userOwnedPublic);

router.route('/org/:ORGANIZATION_NAME').get(
  (req, res, next) => {
    req.login = req.params.ORGANIZATION_NAME;
    next();
  },
  retrieveInstallationAccessToken,
  Projects.organizationWidePublic,
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
