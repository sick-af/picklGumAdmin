import { Component, OnInit } from "@angular/core";
import { UtilsService } from "src/app/_services/utils/utils.service";
import { ProjectTypeService } from "src/app/_services/db/project-type.service";

@Component({
  selector: "app-project-types",
  templateUrl: "./project-types.component.html",
  styleUrls: ["./project-types.component.scss"]
})
export class ProjectTypesComponent implements OnInit {
  constructor(
    private projectTypeService: ProjectTypeService,
    private utilsService: UtilsService
  ) {}

  public isLoading = false;
  public projectTypes = [];
  public cols = [{ value: "name", title: "Name", visible: true }];

  ngOnInit() {
    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    try {
      let response = await this.projectTypeService.getProjectTypes();
      this.projectTypes = response["projectTypes"];
    } catch (error) {
      this.utilsService.forwardErrorMessage("Failed to fetch the projectTypes");
    }
    this.isLoading = false;
  }

  async delete(idx: string) {
    try {
      await this.projectTypeService.deleteProjectType(idx);
      this.utilsService.handleSuccess(
        `ProjectType ${idx} was successfully deleted`
      );
      this.fetch();
    } catch (error) {
      this.utilsService.forwardErrorMessage(
        `Failed to delete ProjectType ${idx}`
      );
    }
  }
}
