import * as jwt from 'jsonwebtoken';
import { User } from '../../domain/user/entities/user.entity';
import { config } from '../../config/env';

export function generateToken(user: User): string {
  return jwt.sign({ userId: user.id, role: user.role }, config.SECRET_KEY, {
    expiresIn: '7d',
  });
}