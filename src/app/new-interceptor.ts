import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class NewInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const apiReq = req.clone({
      // url: `http://api.picklegum.com/${req.url}`,
      url: `http://127.0.0.1:50080/${req.url}`,
    });
    req.headers.set("Access-Control-Allow-Origin", "*");
    return next.handle(apiReq);
  }
}
