import { Injectable, Inject } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpUserEvent,
  HttpErrorResponse,
  HttpClient,
} from "@angular/common/http";

import { Observable, of, from, throwError } from "rxjs";
import { map, catchError, mergeMap } from "rxjs/operators";
import { Router } from "@angular/router";

export const InterceptorSkipHeader = "X-Skip-Interceptor";
@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private router: Router, private httpClient: HttpClient) {}

  private handleAuthError(
    err: HttpErrorResponse,
    req: HttpRequest<any>,
    next: HttpHandler
  ): any {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    window.location.href = "/";
    return of(err.message);
  }

  addToken(req: HttpRequest<any>): HttpRequest<any> {
    const apiToken = localStorage.getItem("token");
    return req.clone({
      headers: req.headers.set("Authorization", apiToken),
    });
  }
  // TODO: refresh token
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<
    | HttpSentEvent
    | HttpHeaderResponse
    | HttpProgressEvent
    | HttpResponse<any>
    | HttpUserEvent<any>
  > {
    if (req.headers.has(InterceptorSkipHeader)) {
      const headers = req.headers.delete(InterceptorSkipHeader);
      return next.handle(req.clone({ headers }));
    }

    // Clone the request to add the new header.
    const authReq = this.addToken(req);
    // send the newly created request
    return next.handle(authReq).pipe(
      map((data) => data),
      catchError((error, caught) => {
        if (error.status === 401) {
          console.log("LALALALAL");
          const errTHROW = this.handleAuthError(error, req, next);
          return errTHROW;
        } else {
          return throwError(error);
        }
      }) as any
    );
  }
}
