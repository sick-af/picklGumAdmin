import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { InterceptorSkipHeader } from "src/app/api-interceptor";
import { BehaviorSubject } from "rxjs";
import { environment } from "../../../environments/environment.prod";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private admin = new BehaviorSubject(null);
  public adminValue = this.admin.asObservable();
  baseUrl: string = environment.backendURL;

  constructor(private httpClient: HttpClient) {
    // this.fetch();
  }

  public async fetch() {
    const localStorageAdmin = localStorage.getItem("admin");

    if (localStorageAdmin) {
      const adminObj = JSON.parse(localStorageAdmin);
      this.admin.next(adminObj);
    }
  }

  public async login(formValue) {
    try {
      const headers = new HttpHeaders().set(InterceptorSkipHeader, "");
      let res = await this.httpClient
        .post(`login`, { user: formValue }, { headers, params: {} })
        .toPromise();

      this.admin.next(res);
      localStorage.setItem("token", JSON.stringify(res));
      localStorage.setItem("admin", JSON.stringify(res));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async refresh() {
    const id = await this.getAdminId();

    let res = await this.httpClient.get(`/api/admin/${id}`).toPromise();

    this.admin.next(res["admin"]);
    localStorage.setItem("admin", JSON.stringify(res["admin"]));
  }

  public async getAdminId() {
    const localStorageAdmin = localStorage.getItem("admin");

    if (localStorageAdmin) {
      const adminObj = JSON.parse(localStorageAdmin);
      return adminObj.id;
    }
  }

  public async logout() {
    this.admin.next(null);
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
  }
}
