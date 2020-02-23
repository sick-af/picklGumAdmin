import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AboutUsService {
  constructor(private httpClient: HttpClient) {}

  public get() {
    return this.httpClient.get(`/api/about-us/`, {}).toPromise();
  }

  public create(formValue: any) {
    return this.httpClient
      .post(`/api/about-us/`, { aboutUs: formValue })
      .toPromise();
  }

  public update(id: String, formValue: any) {
    return this.httpClient
      .patch(`/api/about-us/${id}`, { aboutUs: formValue })
      .toPromise();
  }
}
