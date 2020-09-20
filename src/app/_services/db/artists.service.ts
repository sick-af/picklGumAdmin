import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ArtistsService {
  constructor(private httpClient: HttpClient) {}

  public getArtists() {
    let opt = { balance_due: { ">": 0 } };
    let opts = new HttpParams().set("where", JSON.stringify(opt));
    console.log(opts);

    return this.httpClient.get(`designer`, { params: opts }).toPromise();
  }
  public pay(info) {
    return this.httpClient.post(`designer/pay/`, info).toPromise();
  }
}
