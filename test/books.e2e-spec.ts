import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { BookController } from '../src/modules/book/book.controller';
import { BookService } from '../src/modules/book/book.service';
import { CustomJwtAuthGuard } from '../src/modules/auth/guards/custom-jwt-auth.guard';

describe('BookController (e2e)', () => {
  let app: INestApplication<App>;
  const bookServiceMock = {
    getBooks: jest.fn(),
    getUniqBook: jest.fn(),
    createBook: jest.fn(),
    updateBook: jest.fn(),
    deleteBook: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [{ provide: BookService, useValue: bookServiceMock }],
    })
      .overrideGuard(CustomJwtAuthGuard)
      .useValue({ canActivate: jest.fn().mockReturnValue(true) })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /book returns list', () => {
    const books = [{ id: '1', title: 'A' }];
    bookServiceMock.getBooks.mockResolvedValue(books);

    return request(app.getHttpServer()).get('/book').expect(200).expect(books);
  });

  it('GET /book/:id returns book', () => {
    const book = { id: '1', title: 'A' };
    bookServiceMock.getUniqBook.mockResolvedValue(book);

    return request(app.getHttpServer()).get('/book/1').expect(200).expect(book);
  });

  it('POST /book creates book', () => {
    const payload = {
      title: 'Преступление и Наказание',
      description: 'Краткое описание произведения',
      authors: 'Федор Достаевский',
    };
    const created = { id: '1', ...payload };
    bookServiceMock.createBook.mockResolvedValue(created);

    return request(app.getHttpServer())
      .post('/book')
      .send(payload)
      .expect(201)
      .expect(created);
  });

  it('DELETE /book/:id deleted book', () => {
    const result = { acknowledged: true, deletedCount: 1 };
    bookServiceMock.deleteBook.mockResolvedValue(result);

    return request(app.getHttpServer())
      .delete('/book/1')
      .expect(200)
      .expect(result);
  });
});
