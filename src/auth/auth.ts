import { GraphQLError } from "graphql";
import * as jwt from "jsonwebtoken";

interface DecodedJWT {
  userId: string;
  iat: number;
  exp: number;
}

export const generateJWT = (userId: string) => {
  const secret = process.env.JWT_SECRET || "secret";
  return jwt.sign({ userId }, secret, {
    expiresIn: "24h",
    algorithm: "HS256",
  });
};

export const verifyJWT = (token: string) => {
  try {
    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret"
    ) as DecodedJWT;
    return verified;
  } catch (error) {
    const err = error as jwt.JsonWebTokenError;
    throw new GraphQLError(err.message);
  }
};
