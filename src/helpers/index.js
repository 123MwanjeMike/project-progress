import { Octokit } from '@octokit/core';
import { createAppAuth } from '@octokit/auth-app';
import errorHandler from './errorHandler';
import { generateBearerToken } from '../controllers/auth';

require('dotenv').config();

const octokit = new Octokit({
  authStrategy: createAppAuth,
  auth: {
    appId: process.env.APP_ID,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
});

export const getInstallations = async (res) => {
  try {
    const { data } = await octokit.request('GET /app/installations', {
      headers: {
        authorization: `Bearer ${generateBearerToken()}`,
      },
      mediaType: {
        previews: ['inertia'],
      },
    });
    return data;
  } catch (err) {
    return errorHandler(err, res);
  }
};

export const retrieveInstallationAccessToken = async (req, res, next) => {
  try {
    const installations = await getInstallations(res);
    const installation = installations.find(
      (element) => element.account.login === req.login,
    );
    if (!installation) {
      return res.status(404).json({
        success: false,
        message: `No existing installation for ${req.login}`,
      });
    }
    const { token } = await octokit.auth({
      type: 'installation',
      installationId: installation.id,
    });
    req.installationAccessToken = token;
    next();
    return true;
  } catch (err) {
    return errorHandler(err, res);
  }
};
