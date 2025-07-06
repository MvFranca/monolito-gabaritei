import { validateOrReject } from 'class-validator';

export abstract class BaseMapper<Input, Output> {
  async validateInput(input: Input): Promise<void> {
    await validateOrReject(input as any, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });
  }

  async transform(input: Input): Promise<Output> {
    await this.validateInput(input);
    return this.toDTO(input);
  }

  protected abstract toDTO(input: Input): Output | Promise<Output>;
}
