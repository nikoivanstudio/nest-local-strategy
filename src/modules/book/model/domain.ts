export interface IBook {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly authors: string;
  readonly favorite?: string;
  readonly fileCover?: string;
  readonly fileName?: string;
}

export abstract class AbstractBookRepository {
  public abstract createBook(book: IBook): Promise<IBook>;

  public abstract getUniqBook(id: string): Promise<IBook | null>;

  public abstract getBooks(): Promise<IBook[]>;

  public abstract updateBook(id: string, book: IBook): Promise<IBook>;

  public abstract deleteBook(id: string): Promise<IBook>;
}
