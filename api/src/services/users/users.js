import { authClient, verifyJwt } from 'src/lib/google/auth';
import { createToken } from 'src/lib/auth';
import { db } from 'src/lib/db';

const storeGoogleAuth = async ({ code }) => {
  try {
    const { tokens } = await authClient.getToken(code);

    const payload = await verifyJwt({ token: tokens.id_token });

    const user = await createUser({ email: payload.email });

    const jwt = createToken({ userId: user.id });

    user['jwt'] = jwt;

    await createUserProfile({
      ...user,
      gApiRefreshToken: tokens.refresh_token,
    });
    return user;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const createUser = ({ email }) => {
  return db.user.upsert({
    where: { email },
    update: {
      email,
    },
    create: {
      email,
    },
  });
};

const createUserProfile = ({ email, gApiRefreshToken }) => {
  return db.user.update({
    where: { email },
    data: {
      profile: {
        upsert: {
          create: { gApiRefreshToken },
          update: { gApiRefreshToken },
        },
      },
    },
  });
};

const getUserById = ({ id }) => {
  return db.user.findOne({
    where: { id: id },
  });
};

export { storeGoogleAuth, getUserById };
