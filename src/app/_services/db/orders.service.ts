import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class OrdersService {
  constructor(private httpClient: HttpClient) {}

  public getOrders() {
    return this.httpClient.get(`order`, {}).toPromise();
  }
  public fullfill(id, body) {
    return this.httpClient.post(`order/fulfill/${id}`, body).toPromise();
  }
}
