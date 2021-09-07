import { Octokit } from '@octokit/core';

require('dotenv').config();

const octokit = new Octokit({ auth: process.env.PERSONAL_ACCESS_TOKEN });

exports.ownedProjects = async (req, res) => {
  try {
    const projects = await octokit.request(
      `GET /users/${req.params.username}/projects`,
      {
        username: req.params.username,
        mediaType: {
          previews: ['inertia'],
        },
      },
    );
    return res.status(200).json(projects.data);
  } catch (err) {
    return res.status(500).json({
      error: 'Server Error',
    });
  }
};
