import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UtilsService } from "src/app/_services/utils/utils.service";
import { ProjectTypeService } from "src/app/_services/db/project-type.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-add-project-type",
  templateUrl: "./add-project-type.component.html",
  styleUrls: ["./add-project-type.component.scss"]
})
export class AddProjectTypeComponent implements OnInit {
  public projectTypeId;
  public projectTypeForm: FormGroup;

  constructor(
    private utilsService: UtilsService,
    private projectTypeService: ProjectTypeService,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.projectTypeId = this.route.snapshot.paramMap["params"]["id"];
    this.projectTypeForm = new FormGroup({
      name: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
    this.fetch();
  }

  async fetch() {
    if (this.projectTypeId) {
      let response = await this.projectTypeService.getProjectType(
        this.projectTypeId
      );
      this.projectTypeForm.patchValue(response["projectType"]);
    }
  }

  async submit() {
    if (this.projectTypeForm.invalid) {
      this.utilsService.forwardErrorMessage(
        "Failed to save because some fields are empty."
      );
      return;
    }

    try {
      if (this.projectTypeId) {
        await this.projectTypeService.updateProjectType(
          this.projectTypeId,
          this.projectTypeForm.value
        );
      } else {
        await this.projectTypeService.addProjectType(
          this.projectTypeForm.value
        );
      }
      this.location.back();
    } catch (error) {
      this.utilsService.forwardErrorMessage("Failed to save to projectType.");
    }
  }
}
