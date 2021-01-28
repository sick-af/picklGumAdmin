import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class DesignsService {
  constructor(private httpClient: HttpClient) {}

  public getDesigns() {
    const params = new HttpParams()
      .set("approved", "false")
      .set("rejected", "false");
    return this.httpClient.get(`designrequest`, { params }).toPromise();
  }
  public approve(id) {
    return this.httpClient.patch(`inspect/${id}`, {}).toPromise();
  }
  public reject(id, reason) {
    return this.httpClient
      .patch(`design/reject/${id}`, { reason: reason })
      .toPromise();
  }
  public upload(body) {
    return this.httpClient.post("designrequest/upload", body).toPromise();
  }
}
