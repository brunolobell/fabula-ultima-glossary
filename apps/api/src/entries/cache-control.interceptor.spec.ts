import { ExecutionContext, NotFoundException } from '@nestjs/common';
import { lastValueFrom, of, throwError } from 'rxjs';
import {
  CACHE_CONTROL,
  CacheControlInterceptor,
} from './cache-control.interceptor';

describe('CacheControlInterceptor', () => {
  const setHeader = jest.fn();
  const context = {
    switchToHttp: () => ({ getResponse: () => ({ setHeader }) }),
  } as unknown as ExecutionContext;
  const interceptor = new CacheControlInterceptor();

  beforeEach(() => setHeader.mockReset());

  it('marks a successful response as cacheable', async () => {
    const body = await lastValueFrom(
      interceptor.intercept(context, { handle: () => of({ ok: true }) }),
    );

    expect(body).toEqual({ ok: true });
    expect(setHeader).toHaveBeenCalledWith('Cache-Control', CACHE_CONTROL);
  });

  it('leaves an error response uncached', async () => {
    await expect(
      lastValueFrom(
        interceptor.intercept(context, {
          handle: () => throwError(() => new NotFoundException()),
        }),
      ),
    ).rejects.toBeInstanceOf(NotFoundException);

    expect(setHeader).not.toHaveBeenCalled();
  });
});
