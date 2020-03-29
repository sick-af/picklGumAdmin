import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class CareerService {
  constructor(private httpClient: HttpClient) {}

  public getCareers() {
    return this.httpClient.get(`/api/career/`, {}).toPromise();
  }

  public getCareer(id: string) {
    return this.httpClient.get(`/api/career/${id}`, {}).toPromise();
  }

  public addCareer(formValue: any) {
    return this.httpClient
      .post(`/api/career/`, { career: formValue })
      .toPromise();
  }

  public updateCareer(id: string, formValue: any) {
    return this.httpClient
      .patch(`/api/career/${id}`, { career: formValue })
      .toPromise();
  }

  public deleteCareer(id: string) {
    return this.httpClient.delete(`/api/career/${id}`).toPromise();
  }
}
