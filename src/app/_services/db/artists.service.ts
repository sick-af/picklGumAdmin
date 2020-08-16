import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {

  constructor(private httpClient: HttpClient) { }

  public getArtists() {
    return this.httpClient.get(`/api/designer`, {}).toPromise();
  }
}
