import * as jwt from 'jsonwebtoken';
import { config } from "../config/env";
import { User } from "@prisma/client";

export function generateToken(user:User) {
  console.log("Generating token for user:", user);
  return jwt.sign({ userId: user.id, role: user.role }, config.SECRET_KEY, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string) {
    try {
      return jwt.verify(token, config.SECRET_KEY);
    } catch (error) {
      throw new Error("Token inválido!");
    }
}
  