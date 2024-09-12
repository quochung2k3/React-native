import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  return jwt.sign(user, 'your-secret-key', { expiresIn: '1h' });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, 'your-secret-key');
  } catch (error) {
    return null;
  }
};