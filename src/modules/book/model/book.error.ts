export class BookError extends Error {
  code: number = 400;

  constructor(message: string, code?: number) {
    super(message);

    if (code) {
      this.code = code;
    }
  }
}
