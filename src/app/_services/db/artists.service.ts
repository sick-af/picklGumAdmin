import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ArtistsService {
  constructor(private httpClient: HttpClient) {}

  public getAllArtists() {
    return this.httpClient.get(`designer`).toPromise();
  }

  public getArtists() {
    let opt = { balance_due: { ">": 0 } };
    let opts = new HttpParams().set("where", JSON.stringify(opt));

    return this.httpClient.get(`designer`, { params: opts }).toPromise();
  }
  public pay(info) {
    return this.httpClient.post(`designer/pay/`, info).toPromise();
  }
}
