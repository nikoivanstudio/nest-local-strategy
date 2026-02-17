import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { BookService } from './book.service';
import { DeleteResult } from 'mongoose';
import { BookDocument } from './model/book.schema';
import { BookValidationPipe } from '../../common/pipes/book-validation-pipe';
import { CreateBookDto } from './model/dto/create-book-dto';
import { UpdateBookDto } from './model/dto/update-book-dto';
import { CustomJwtAuthGuard } from '../auth/guards/custom-jwt-auth.guard';

@UseGuards(CustomJwtAuthGuard)
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get(':id')
  getBook(@Param('id') id: string): Promise<BookDocument | null> {
    return this.bookService.getUniqBook(id);
  }

  // @UseGuards(DailyGuard)
  @Get()
  getAllBooks(): Promise<BookDocument[] | null> {
    return this.bookService.getBooks();
  }

  @UsePipes(BookValidationPipe)
  @Post()
  createBook(@Body() book: CreateBookDto): Promise<BookDocument | null> {
    return this.bookService.createBook(book);
  }

  @UsePipes(BookValidationPipe)
  @Patch(':id')
  updateBook(
    @Param() { id }: { id: string },
    @Body() book: UpdateBookDto,
  ): Promise<BookDocument | null> {
    return this.bookService.updateBook(id, book);
  }

  @Delete(':id')
  deleteBook(@Param() { id }: { id: string }): Promise<DeleteResult> {
    return this.bookService.deleteBook(id);
  }
}
