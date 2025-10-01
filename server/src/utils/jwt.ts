import jwt, { Algorithm, JwtPayload, SignOptions } from 'jsonwebtoken';


const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as jwt.Secret;
const JWT_TOKEN_EXPIRES_IN = process.env.JWT_TOKEN_EXPIRES_IN as string;

export const generateToken = (payload: Record<string, unknown>) => {
  const options: SignOptions = {
    algorithm: 'HS256' as Algorithm,
    expiresIn: Number(JWT_TOKEN_EXPIRES_IN), // seconds
  };
  return jwt.sign(payload, JWT_SECRET_KEY, options);
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;
  } catch (err) {
    return null;
  }
};
