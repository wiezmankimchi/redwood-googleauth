import { OAuth2Client } from 'google-auth-library';

const authClient = new OAuth2Client(
  process.env.REDWOOD_ENV_GOOGLE_API_CLIENT_ID,
  process.env.GOOGLE_API_CLIENT_SECRET,
  process.env.GOOGLE_API_REDIRECT_URL
);

const verifyJwt = async ({ token }) => {
  try {
    const ticket = await authClient.verifyIdToken({
      idToken: token,
      audience: process.env.REDWOOD_ENV_GOOGLE_API_CLIENT_ID,
    });
    return ticket.getPayload();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { authClient, verifyJwt };
