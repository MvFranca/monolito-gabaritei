import { HttpException, HttpStatus } from "@nestjs/common";

export class UserAlreadyExistsException extends HttpException {
  constructor(email: string) {
    super(`Este email já está em uso`, HttpStatus.CONFLICT);
  }
}