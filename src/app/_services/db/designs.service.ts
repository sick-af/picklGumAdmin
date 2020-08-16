import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DesignsService {

  constructor(private httpClient: HttpClient) { }

  public getDesigns() {
    return this.httpClient.get(`/api/designrequest`, {}).toPromise();
  }
  public approve(id){
    return this.httpClient.patch(`/api/inspect/${id}`,{}).toPromise();
  }
}
