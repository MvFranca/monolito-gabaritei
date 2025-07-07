import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/modules/user/domain/entities/user.entity';

@Injectable()
export class JwtService {
  private readonly secret = process.env.JWT_SECRET || 'my-secret-key';
  private readonly expiresIn = '1d';

  sign(user: User): string {
    return jwt.sign(
      {
        sub: user.id,
        email: user.email,
        role: user.role,
      },
      this.secret,
      {
        expiresIn: this.expiresIn,
      },
    );
  }

  verify(token: string): User {
    try {
      const decoded = jwt.verify(token, this.secret) as User;
      return decoded;
    } catch (error) {
      throw new Error('Invalid token');
    }
  } 

  generateToken({id, role}: {id: string, role: string}): string {
    return jwt.sign({ userId: id, role: role }, this.secret, {
      expiresIn: '7d',
    });
  }
}
