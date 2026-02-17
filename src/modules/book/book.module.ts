import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookRepository } from './repositories/book.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './model/book.schema';
import { BookValidationPipe } from '../../common/pipes/book-validation-pipe';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
  controllers: [BookController],
  providers: [BookService, BookRepository, BookValidationPipe],
  exports: [BookService],
})
export class BookModule {}
