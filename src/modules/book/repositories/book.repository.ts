import { Injectable } from '@nestjs/common';
import { AbstractBookRepository, IBook } from '../model/domain';

@Injectable()
export class BookRepository extends AbstractBookRepository {
  private books: IBook[] = [];

  async getBooks(): Promise<IBook[]> {
    await new Promise((resolve) => setTimeout(resolve, 100));

    return this.books;
  }

  async getUniqBook(id: string): Promise<IBook | null> {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const book = this.books.find((book) => book.id === id);

    return book || null;
  }

  async createBook(book: IBook): Promise<IBook> {
    await new Promise((resolve) => setTimeout(resolve, 100));

    this.books.push(book);

    return book;
  }

  async updateBook(id: string, book: IBook): Promise<IBook> {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const foundedBook = this.books.find((b) => b.id === id);

    if (!foundedBook) {
      throw new Error('Book not found');
    }

    const newBook = { ...foundedBook, ...book };

    this.books = this.books.filter((b) => b.id !== id);
    this.books.push(newBook);

    return newBook;
  }

  async deleteBook(id: string): Promise<IBook> {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const bookToDelete = await this.getUniqBook(id);

    if (!bookToDelete) {
      throw new Error('Book not found');
    }

    this.books = this.books.filter((book) => book.id !== id);

    return bookToDelete;
  }
}
