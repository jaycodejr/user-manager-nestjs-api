import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class EmailValidationPipe implements PipeTransform<string, string> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: string, _metadata: ArgumentMetadata): string {
    // Implement your custom email validation logic here
    if (!this.isValidEmail(value)) {
      throw new BadRequestException('Invalid email address');
    }
    return value;
  }

  isValidEmail(payload: any): boolean {
    const { email } = payload;
    const regx = new RegExp(
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    );
    return regx.test(email);
  }
}
