import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class ModeService {
  constructor(private http: HttpClient) {}

  updateMode(modeID: any, value: any) {
    return this.http.patch(`mode/${modeID}`, value).toPromise();
  }
  createMode(value: any) {
    return this.http.post(`mode/`, value).toPromise();
  }
  fetchAll() {
    return this.http.get(`mode`).toPromise();
  }
  fetchMode(id) {
    return this.http.get(`mode/${id}`).toPromise();
  }
  deleteMode(id) {
    return this.http.delete(`mode/${id}`).toPromise();
  }
}
