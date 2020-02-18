import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs/internal/Observable";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  checkAuth(state) {
    if (localStorage.getItem("token")) {
      // logged in so return true
      return true;
    }
    this.router.navigate(["/auth"], {
      queryParams: {
        returnUrl: state.url,
        error: "Please, login to access this page."
      }
    });
    return false;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkAuth(state);
  }
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkAuth(state);
  }
}
