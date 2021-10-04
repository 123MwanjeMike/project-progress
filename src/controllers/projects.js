import { Octokit } from '@octokit/core';
import errorHandler from '../helpers/errorHandler';

const octokit = new Octokit();

exports.userOwnedPublic = async (req, res) => {
  try {
    const { data } = await octokit.request(
      `GET /users/${req.params.username}/projects`,
      {
        username: req.params.username,
        mediaType: {
          previews: ['inertia'],
        },
      },
    );
    return res.status(200).json(data);
  } catch (err) {
    return errorHandler(err, res);
  }
};

exports.organizationWide = async (req, res) => {
  try {
    const { data } = await octokit.request(
      `GET /orgs/${req.params.organisationName}/projects`,
      {
        org: req.params.organisationName,
        headers: {
          authorization: `token ${req.installationAccessToken}`,
        },
        mediaType: {
          previews: ['inertia'],
        },
      },
    );
    return res.status(200).json(data);
  } catch (err) {
    return errorHandler(err, res);
  }
};

exports.repositoryProjects = async (req, res) => {
  try {
    const { data } = await octokit.request(
      `GET /repos/${req.query.owner}/${req.query.repo}/projects`,
      {
        owner: req.query.owner,
        repo: req.query.repo,
        headers: {
          authorization: `token ${req.installationAccessToken}`,
        },
        mediaType: {
          previews: ['inertia'],
        },
      },
    );
    return res.status(200).json(data);
  } catch (err) {
    return errorHandler(err, res);
  }
};
