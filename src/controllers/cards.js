import { Octokit } from '@octokit/core';
import errorHandler from '../helpers/errorHandler';

const octokit = new Octokit();

export const allCards = async (req, res) => {
  try {
    const { data } = await octokit.request(
      `GET /projects/columns/${req.params.column_id}/cards`,
      {
        project_id: req.params.column_id,
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