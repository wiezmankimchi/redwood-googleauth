import jwt from 'jsonwebtoken';

const createToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
  return token;
};

const decodeToken = (token) => {
  const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
  return payload;
};

export { createToken, decodeToken };
