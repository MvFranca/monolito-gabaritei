export class UserAlreadyExistsException extends Error {
  constructor(email: string) {
    super(`Este email já está em uso`);
    this.name = 'UserAlreadyExistsException';
  }
}