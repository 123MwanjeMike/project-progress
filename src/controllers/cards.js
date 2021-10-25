import { Octokit } from '@octokit/core';
import errorHandler from '../helpers/errorHandler';

const octokit = new Octokit();

const getColumnCards = async (req, res) => {
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
    return data;
  } catch (err) {
    return errorHandler(err, res);
  }
};

export const columnCards = async (req, res) => {
  try {
    const cards = await getColumnCards(req, res);
    return res.status(200).json(cards);
  } catch (err) {
    return errorHandler(err, res);
  }
};

export const numberOfColumnCards = async (req, res) => {
  try {
    const cards = await getColumnCards(req, res);
    return res.status(200).json({ numberOfCards: cards.length });
  } catch (err) {
    return errorHandler(err, res);
  }
};
