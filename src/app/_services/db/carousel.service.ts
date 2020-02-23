import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class CarouselService {
  constructor(private httpClient: HttpClient) {}

  public get() {
    return this.httpClient.get(`/api/carousel/`, {}).toPromise();
  }

  public update(formValue: any) {
    return this.httpClient
      .patch(`/api/carousel`, { carousel: formValue })
      .toPromise();
  }
}
