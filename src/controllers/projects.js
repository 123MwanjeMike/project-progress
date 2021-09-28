import { Octokit } from '@octokit/core';

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
    if (err.response) {
      return res.status(err.response.status).json({
        error: err.response.data.message,
      });
    }
    return res.status(500).json({
      error: 'Server Error',
    });
  }
};

exports.organizationWidePublic = async (req, res) => {
  try {
    const { data } = await octokit.request(
      `GET /orgs/${req.query.owner}/projects`,
      {
        org: req.query.owner,
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
    if (err.response) {
      return res.status(err.response.status).json({
        error: err.response.data.message,
      });
    }
    return res.status(500).json({
      error: 'Server Error',
    });
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
    if (err.response) {
      return res.status(err.response.status).json({
        error: err.response.data.message,
      });
    }
    return res.status(500).json({
      error: 'Server Error',
    });
  }
};
