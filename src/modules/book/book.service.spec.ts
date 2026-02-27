import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { Book } from './model/book.schema';
import { DeleteResult } from 'mongoose';
import { IBook } from './model/domain';

const testBook = {
  id: '1',
  title: 'Война и Мир',
  authors: 'Лев Толстой',
  description: 'Описание книги Война и Мир',
};

describe('BookService', () => {
  let service: BookService;

  const modelMock = {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findOneAndUpdate: jest.fn(),
    deleteOne: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        { provide: getModelToken(Book.name), useValue: modelMock },
        { provide: getConnectionToken(), useValue: {} },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
  });

  describe('getBooks', () => {
    it('Получаем список книг', async () => {
      const books: IBook[] = [testBook];
      modelMock.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(books),
      });

      await expect(service.getBooks()).resolves.toEqual(books);
    });

    it('Получаем null когда книг нет', async () => {
      modelMock.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.getBooks()).resolves.toBeNull();
    });

    it('Получаем null или ошибку', async () => {
      modelMock.find.mockReturnValue({
        exec: jest.fn().mockRejectedValue(new Error('Возможная ошибка в БД')),
      });

      await expect(service.getBooks()).resolves.toBeNull();
    });
  });

  describe('getUniqBook', () => {
    it('Получаем книгу по id', async () => {
      const book = testBook;
      modelMock.findById.mockResolvedValue(book);

      await expect(service.getUniqBook('1')).resolves.toEqual(book);
    });

    it('Получаем null если отсуствует id', async () => {
      await expect(service.getUniqBook('')).resolves.toBeNull();
      expect(modelMock.findById).not.toHaveBeenCalled();
    });

    it('Получаем null, когда книга не найдена', async () => {
      modelMock.findById.mockResolvedValue(null);

      await expect(service.getUniqBook('3')).resolves.toBeNull();
    });
  });

  describe('createBook', () => {
    it('Создаем и возвращаем книгу', async () => {
      const book = testBook;
      modelMock.create.mockResolvedValue(book);

      await expect(service.createBook(book)).resolves.toEqual(book);
    });

    it('Получаем null, если возникла ошибка при создании книги', async () => {
      modelMock.create.mockResolvedValue(null);

      await expect(service.createBook(testBook)).resolves.toBeNull();
    });
  });

  describe('updateBook', () => {
    it('Получаем null если id не передано', async () => {
      await expect(service.updateBook('', testBook)).resolves.toBeNull();
      expect(modelMock.findById).not.toHaveBeenCalled();
    });

    it('Получаем null когда книга не найдена', async () => {
      modelMock.findById.mockResolvedValue(null);

      await expect(service.updateBook('3', testBook)).resolves.toBeNull();
      expect(modelMock.findOneAndUpdate).not.toHaveBeenCalled();
    });

    it('Получаем null когда обновление неудачно', async () => {
      modelMock.findById.mockResolvedValue({ id: '1' });
      modelMock.findOneAndUpdate.mockResolvedValue(null);

      await expect(service.updateBook('1', testBook)).resolves.toBeNull();
    });

    it('Получаем обновленую книгу при успешном обновлении', async () => {
      const updated = testBook;
      modelMock.findById.mockResolvedValue({ id: '1' });
      modelMock.findOneAndUpdate.mockResolvedValue(updated);

      await expect(
        service.updateBook('1', { ...testBook, title: 'Война и Мир2' }),
      ).resolves.toEqual(updated);
    });
  });

  describe('deleteBook', () => {
    it('Получаем результат удаления', async () => {
      const result = { acknowledged: true, deletedCount: 1 } as DeleteResult;
      modelMock.deleteOne.mockResolvedValue(result);

      await expect(service.deleteBook('1')).resolves.toEqual(result);
    });

    it('Получаем ошибку, если не удалось удалить книгу', async () => {
      const result = { acknowledged: true, deletedCount: 0 } as DeleteResult;

      modelMock.deleteOne.mockResolvedValue(result);

      await expect(service.deleteBook('1')).resolves.toEqual(result);
    });
  });
});
