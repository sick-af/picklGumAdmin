import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ProjectService {
  constructor(private httpClient: HttpClient) {}

  public getProjects() {
    return this.httpClient.get(`/api/project/`, {}).toPromise();
  }

  public getProject(id: string) {
    return this.httpClient.get(`/api/project/${id}`, {}).toPromise();
  }

  public addProject(formValue: any) {
    return this.httpClient
      .post(`/api/project/`, { project: formValue })
      .toPromise();
  }

  public updateProject(id: string, formValue: any) {
    return this.httpClient
      .patch(`/api/project/${id}`, { project: formValue })
      .toPromise();
  }

  public deleteProject(id: string) {
    return this.httpClient.delete(`/api/project/${id}`).toPromise();
  }
}
