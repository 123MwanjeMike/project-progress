import { Octokit } from '@octokit/core';
import errorHandler from '../helpers/errorHandler';

require('dotenv').config();

const octokit = new Octokit();
const stateString = (Math.random() + 1).toString(36).substring(7);

exports.requestIdentity = async (req, res) => {
  try {
    const clientId = process.env.CLIENT_ID;
    const redirectUri = 'http://localhost:3000/auth/success';

    return res
      .status(302)
      .redirect(
        `https://github.com/login/oauth/authorize/?client_id=${clientId}&redirect_uri=${redirectUri}&state=${stateString}`,
      );
  } catch (err) {
    return errorHandler(err, res);
  }
};

exports.userIdentity = async (req, res) => {
  try {
    if (req.query.state !== stateString) {
      return res
        .status(401)
        .json({ error: 'Request was created by a third party!' });
    }

    const { data } = await octokit.request(
      'POST https://github.com/login/oauth/access_token',
      {
        code: req.query.code,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: 'https://github.com/apps/track-prgress-and-report',
      },
    );

    global.userAccessToken = data.access_token;

    return res
      .status(200)
      .json({ message: 'Login successful', token: data.access_token });
  } catch (err) {
    return errorHandler(err, res);
  }
};
