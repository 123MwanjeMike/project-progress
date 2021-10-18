import { Octokit } from '@octokit/core';
import errorHandler from '../helpers/errorHandler';

const octokit = new Octokit();

export const userOwnedPublic = async (req, res) => {
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

export const organizationWide = async (req, res) => {
  try {
    const { data } = await octokit.request(
      `GET /orgs/${req.params.organisationName}/projects`,
      {
        org: req.params.organisationName,
        headers: req.headers,
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

export const repositoryProjects = async (req, res) => {
  try {
    const { data } = await octokit.request(
      `GET /repos/${req.query.owner}/${req.query.repo}/projects`,
      {
        owner: req.query.owner,
        repo: req.query.repo,
        headers: req.headers,
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
