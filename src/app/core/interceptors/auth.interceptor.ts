import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private readonly excludedUrls = ['/auth/login', '/auth/register'];

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isExcluded = this.excludedUrls.some(url => request.url.includes(url));

    if (isExcluded) {
      return next.handle(request);
    }

    const token = localStorage.getItem('token');

    if (token) {
      const clonedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(clonedRequest);
    }

    return next.handle(request);
  }
}
