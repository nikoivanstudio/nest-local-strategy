import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
  Type,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { SigninUserDto } from '../../modules/user/model/dto/sign-in-user.dto';

@Injectable()
export class SignInUserValidationPipe implements PipeTransform {
  async transform(value: unknown, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    if (!value || typeof value !== 'object') {
      throw new BadRequestException('Object must be an object');
    }

    const object = plainToClass<SigninUserDto, object>(metatype, value);
    const errors = await validate(object);

    if (errors.length) {
      throw new BadRequestException(errors);
    }

    return object;
  }

  private toValidate(metatype: Type<unknown> | undefined): boolean {
    const types: (Type<unknown> | undefined)[] = [Object];

    return !types.includes(metatype);
  }
}
