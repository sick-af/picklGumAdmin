import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ApplicationService {
  constructor(private httpClient: HttpClient) {}

  public getApplications() {
    return this.httpClient.get(`/api/application/`, {}).toPromise();
  }

  public getApplication(id: string) {
    return this.httpClient.get(`/api/application/${id}`, {}).toPromise();
  }

  public addApplication(formValue: any) {
    return this.httpClient
      .post(`/api/application/`, { application: formValue })
      .toPromise();
  }

  public updateApplication(id: string, formValue: any) {
    return this.httpClient
      .patch(`/api/application/${id}`, { application: formValue })
      .toPromise();
  }

  public deleteApplication(id: string) {
    return this.httpClient.delete(`/api/application/${id}`).toPromise();
  }
}
