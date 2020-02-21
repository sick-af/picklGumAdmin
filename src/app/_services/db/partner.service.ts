import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class PartnerService {
  constructor(private httpClient: HttpClient) {}

  public getPartners() {
    return this.httpClient.get(`/api/partner/`, {}).toPromise();
  }

  public getPartner(id: string) {
    return this.httpClient.get(`/api/partner/${id}`, {}).toPromise();
  }

  public addPartner(formValue: any) {
    return this.httpClient
      .post(`/api/partner/`, { partner: formValue })
      .toPromise();
  }

  public updatePartner(id: string, formValue: any) {
    return this.httpClient
      .patch(`/api/partner/${id}`, { partner: formValue })
      .toPromise();
  }

  public deletePartner(id: string) {
    return this.httpClient.delete(`/api/partner/${id}`).toPromise();
  }
}
