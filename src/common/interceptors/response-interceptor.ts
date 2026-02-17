import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T> {
  public intercept(
    _: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data: T) => ({ data, status: 'success' })),
      // Для проверки раскомментировать и убрать из main.ts -   app.useGlobalFilters(new ResponseExceptionFilter());
      // catchError((error: unknown) =>
      //   throwError(() => {
      //     let errorData: unknown = error;
      //
      //     if (error instanceof HttpException) {
      //       errorData = error.getResponse();
      //     }
      //
      //     return { status: 'fail', data: errorData };
      //   }),
      // ),
    );
  }
}
