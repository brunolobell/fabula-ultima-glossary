import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

/**
 * Content only changes when the seed is re-run: let browsers and CDNs reuse a
 * response for 5 minutes, then keep serving it while they revalidate with the
 * ETag Express already adds (a 304 carries no body).
 */
export const CACHE_CONTROL =
  'public, max-age=300, stale-while-revalidate=86400';

/**
 * Sets the header only once the handler has succeeded, so a 404 or a 400 is
 * never cached (a `@Header()` decorator would also stamp error responses).
 */
@Injectable()
export class CacheControlInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      tap(() => {
        context
          .switchToHttp()
          .getResponse<{ setHeader(name: string, value: string): void }>()
          .setHeader('Cache-Control', CACHE_CONTROL);
      }),
    );
  }
}
