import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AdminService {
  constructor(private httpClient: HttpClient) {}

  public getAdmins() {
    return this.httpClient.get(`/api/admin/`, {}).toPromise();
  }

  public getAdmin(id: string) {
    return this.httpClient.get(`/api/admin/${id}`, {}).toPromise();
  }

  public addAdmin(formValue: any) {
    return this.httpClient
      .post(`/api/admin/`, { admin: formValue })
      .toPromise();
  }

  public updateAdmin(id: string, formValue: any) {
    return this.httpClient
      .patch(`/api/admin/${id}`, { admin: formValue })
      .toPromise();
  }

  public deleteAdmin(id: string) {
    return this.httpClient.delete(`/api/admin/${id}`).toPromise();
  }
}
