import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  public getCategories(opts = {}) {
    return this.httpClient.get(`category`, { params: opts }).toPromise();
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
  public uploadImages(files, opts = {}) {
    return this.httpClient
      .post(`category/upload`, files, { params: opts })
      .toPromise();
  }
  public getVariants() {
    return this.httpClient.get(`variant`, {}).toPromise();
  }
  public getVariant(id) {
    return this.httpClient.get(`variant/${id}`, {}).toPromise();
  }
  public createVariant(body) {
    return this.httpClient.post(`variant`, body).toPromise();
  }
  public updateVariant(body, id) {
    return this.httpClient.patch(`variant/${id}`, body).toPromise();
  }
  public deleteVariant(id) {
    return this.httpClient.delete(`variant/${id}`).toPromise();
  }
  public getImages(variant_id, catgeory_id) {
    return this.httpClient
      .get(`images`, {
        params: {
          variant: variant_id,
          category: catgeory_id,
        },
      })
      .toPromise();
  }
  public deleteImage(id) {
    return this.httpClient.delete(`images/${id}`).toPromise();
  }

  uploadImagesToDrive(category_id, variant_id) {
    return this.httpClient
      .post(`category/${category_id}/variant/${variant_id}`, {})
      .toPromise();
  }
}
