import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class MediaService {
  constructor(private httpClient: HttpClient) {}

  public upload(formData) {
    return this.httpClient
      .post(`/api/media/`, formData, {
        reportProgress: true,
        observe: "events"
      })
      .toPromise();
  }
}
