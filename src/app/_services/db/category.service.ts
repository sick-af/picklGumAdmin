import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  public getCategories() {
    return this.httpClient.get(`category`, {}).toPromise();
  }
  public getCategory(id) {
    return this.httpClient.get(`category/${id}`, {}).toPromise();
  }
  public createCategory(body) {
    return this.httpClient.post(`category`, body).toPromise();
  }
  public updateCategory(id, body) {
    console.log(id, body);
    return this.httpClient.patch(`category/${id}`, body).toPromise();
  }
  public deleteCategory(id) {
    return this.httpClient.delete(`category/${id}`).toPromise();
  }
  public uploadToGoogleDrive(body) {
    return this.httpClient.post(`drive`, body).toPromise();
  }
  public updateDrive(body) {
    return this.httpClient.patch(`drive`, body).toPromise();
  }
  public deleteFolder(body) {
    return this.httpClient.post(`delete`, body).toPromise();
  }
}
