import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ReasonsService {
  constructor(private httpClient: HttpClient) {}
  public fetchReasons() {
    return this.httpClient.get(`reasons`, {}).toPromise();
  }
  public createReason(body) {
    return this.httpClient.post(`reasons`, body).toPromise();
  }
  public updateReason(id, body) {
    return this.httpClient.patch(`reasons/${id}`, body).toPromise();
  }
  public fetchReason(id) {
    return this.httpClient.get(`reasons/${id}`, {}).toPromise();
  }
  public deleteReason(id) {
    return this.httpClient.delete(`reasons/${id}`, {}).toPromise();
  }
}
