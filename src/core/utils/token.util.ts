import * as jwt from 'jsonwebtoken';
import { config } from '../config/env';
import { Role } from '@prisma/client';

interface User {
  id: string;
  role: Role;
}

export function generateToken(user: User): string | undefined {
  return jwt.sign({ userId: user.id, role: user.role }, config.SECRET_KEY, {
    expiresIn: '7d',
  });
}