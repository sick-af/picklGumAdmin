import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  public getProducts() {
    return this.httpClient.get(`/api/product/`, {}).toPromise();
  }

  public getProduct(id: string) {
    return this.httpClient.get(`/api/product/${id}`, {}).toPromise();
  }

  public addProduct(formValue: any) {
    return this.httpClient
      .post(`/api/product/`, { product: formValue })
      .toPromise();
  }

  public updateProduct(id: string, formValue: any) {
    return this.httpClient
      .patch(`/api/product/${id}`, { product: formValue })
      .toPromise();
  }

  public deleteProduct(id: string) {
    return this.httpClient.delete(`/api/product/${id}`).toPromise();
  }
}
