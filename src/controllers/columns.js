import { Octokit } from '@octokit/core';
import errorHandler from '../helpers/errorHandler';

const octokit = new Octokit();

const projectColumns = async (req, res) => {
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
    return data;
  } catch (err) {
    return errorHandler(err, res);
  }
};

export const allColumns = async (req, res) => {
  try {
    const columns = await projectColumns(req, res);
    return res.status(200).json(columns);
  } catch (err) {
    return errorHandler(err, res);
  }
};

export const toDoColumn = async (req, res) => {
  try {
    const [firstColumn] = await projectColumns(req, res);
    return res.status(200).json(firstColumn);
  } catch (err) {
    return errorHandler(err, res);
  }
};
