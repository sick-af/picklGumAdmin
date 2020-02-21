import { Component, OnInit } from "@angular/core";
import { ProjectService } from "src/app/_services/db/project.service";
import { UtilsService } from "src/app/_services/utils/utils.service";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.scss"]
})
export class ProjectsComponent implements OnInit {
  constructor(
    private projectService: ProjectService,
    private utilsService: UtilsService
  ) {}

  public isLoading = false;
  public projects = [];
  public cols = [{ value: "name", title: "Name", visible: true }];

  ngOnInit() {
    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    try {
      let response = await this.projectService.getProjects();
      this.projects = response["projects"];
    } catch (error) {
      this.utilsService.forwardErrorMessage("Failed to fetch the projects");
    }
    this.isLoading = false;
  }

  async delete(idx: string) {
    try {
      await this.projectService.deleteProject(idx);
      this.utilsService.handleSuccess(
        `Project ${idx} was successfully deleted`
      );
      this.fetch();
    } catch (error) {
      this.utilsService.forwardErrorMessage(`Failed to delete Project ${idx}`);
    }
  }
}
