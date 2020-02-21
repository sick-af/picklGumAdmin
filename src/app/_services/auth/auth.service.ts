import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { InterceptorSkipHeader } from "src/app/api-interceptor";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  public admin: any;

  constructor(private httpClient: HttpClient) {}

  public async login(formValue) {
    try {
      const headers = new HttpHeaders().set(InterceptorSkipHeader, "");
      let res = await this.httpClient
        .post(`/api/admin/login`, { admin: formValue }, { headers, params: {} })
        .toPromise();

      this.admin = res["admin"];
      localStorage.setItem("token", res["token"]);
      localStorage.setItem("admin", JSON.stringify(res["admin"]));
    } catch (error) {
      throw error;
    }
  }

  public async logout() {
    this.admin = null;
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
  }
}
