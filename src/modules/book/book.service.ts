import { Injectable } from '@nestjs/common';
import { BookError } from './model/book.error';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './model/book.schema';
import { Connection, DeleteResult, Model } from 'mongoose';
import { CreateBookDto } from './model/dto/create-book-dto';
import { UpdateBookDto } from './model/dto/update-book-dto';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private BookModel: Model<BookDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  public async getBooks(): Promise<BookDocument[] | null> {
    try {
      const books: BookDocument[] = await this.BookModel.find().exec();

      if (!books) {
        return null;
      }

      return books;
    } catch (error) {
      console.error(error);

      return null;
    }
  }

  public async getUniqBook(id: string): Promise<BookDocument | null> {
    try {
      if (!id) {
        throw new BookError('Отсутствует идентификатор книги', 404);
      }

      const book = await this.BookModel.findById(id);

      if (!book) {
        throw new BookError(`Книга с идентификатором ${id} не найдена`, 404);
      }

      return book;
    } catch (error) {
      console.error(error);

      return null;
    }
  }

  public async createBook(book: CreateBookDto): Promise<BookDocument | null> {
    try {
      const createdBook = await this.BookModel.create(book);

      if (!createdBook) {
        throw new BookError('Ошибка при создание книги');
      }

      return createdBook;
    } catch (error) {
      console.error(error);

      return null;
    }
  }

  public async updateBook(
    id: string,
    book: UpdateBookDto,
  ): Promise<BookDocument | null> {
    try {
      if (!id) {
        console.error('Id is missing');

        return null;
      }

      const foundedBook = await this.getUniqBook(id);

      if (!foundedBook) {
        console.error(`Книга с идентификатором ${id} не найдена`);

        return null;
      }

      const updatedBook = await this.BookModel.findOneAndUpdate(
        { _id: id },
        book,
      );

      if (!updatedBook) {
        console.error('Ошибка при обновление книги');

        return null;
      }
      return updatedBook;
    } catch (error) {
      console.error(error);

      return null;
    }
  }

  public async deleteBook(id: string): Promise<DeleteResult> {
    const book = await this.BookModel.deleteOne({ _id: id });

    if (!book) {
      throw new BookError(`Книга с идентификатором ${id} не найдена`);
    }

    return book;
  }
}
