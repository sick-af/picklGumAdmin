import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ProjectTypeService {
  constructor(private httpClient: HttpClient) {}

  public getProjectTypes() {
    return this.httpClient.get(`/api/project-type/`, {}).toPromise();
  }

  public getProjectType(id: string) {
    return this.httpClient.get(`/api/project-type/${id}`, {}).toPromise();
  }

  public addProjectType(formValue: any) {
    return this.httpClient
      .post(`/api/project-type/`, { projectType: formValue })
      .toPromise();
  }

  public updateProjectType(id: string, formValue: any) {
    return this.httpClient
      .patch(`/api/project-type/${id}`, { projectType: formValue })
      .toPromise();
  }

  public deleteProjectType(id: string) {
    return this.httpClient.delete(`/api/project-type/${id}`).toPromise();
  }
}
