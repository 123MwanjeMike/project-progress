import { Octokit } from '@octokit/core';
import errorHandler from '../helpers/errorHandler';

const octokit = new Octokit();

export const allColumns = async (req, res) => {
  try {
    const { data } = await octokit.request(
      `GET /projects/${req.params.project_id}/columns`,
      {
        project_id: req.params.project_id,
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
