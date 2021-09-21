import { Octokit } from '@octokit/core';

require('dotenv').config();

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
    return res.status(500).json({
      error: 'Server Error',
    });
  }
};

exports.organizationWidePublic = async (req, res) => {
  try {
    const { data } = await octokit.request(
      `GET /orgs/${req.params.organization_name}/projects`,
      {
        org: req.params.organization_name,
        mediaType: {
          previews: ['inertia'],
        },
      },
    );
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      error: 'Server Error',
    });
  }
};
