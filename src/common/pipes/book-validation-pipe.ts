import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
  Type,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateBookDto } from '../../modules/book/model/dto/create-book-dto';
import { validate } from 'class-validator';

@Injectable()
export class BookValidationPipe implements PipeTransform {
  async transform(value: unknown, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    if (!value || typeof value !== 'object') {
      throw new BadRequestException('Object must be an object');
    }

    const object = plainToClass<CreateBookDto, object>(metatype, value);
    const errors = await validate(object);

    if (errors.length) {
      throw new BadRequestException(errors);
    }

    return object;
  }

  private toValidate(metatype: Type<unknown> | undefined): boolean {
    const types: (Type<unknown> | undefined)[] = [String, Object];

    return !types.includes(metatype);
  }
}
