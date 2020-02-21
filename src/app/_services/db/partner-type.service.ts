import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class PartnerTypeService {
  constructor(private httpClient: HttpClient) {}

  public getPartnerTypes() {
    return this.httpClient.get(`/api/partner-type/`, {}).toPromise();
  }

  public getPartnerType(id: string) {
    return this.httpClient.get(`/api/partner-type/${id}`, {}).toPromise();
  }

  public addPartnerType(formValue: any) {
    return this.httpClient
      .post(`/api/partner-type/`, { partnerType: formValue })
      .toPromise();
  }

  public updatePartnerType(id: string, formValue: any) {
    return this.httpClient
      .patch(`/api/partner-type/${id}`, { partnerType: formValue })
      .toPromise();
  }

  public deletePartnerType(id: string) {
    return this.httpClient.delete(`/api/partner-type/${id}`).toPromise();
  }
}
