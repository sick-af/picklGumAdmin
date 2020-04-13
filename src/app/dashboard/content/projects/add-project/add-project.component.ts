import { Component, OnInit, ViewChild, ViewChildren } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UtilsService } from "src/app/_services/utils/utils.service";
import { ImageUploadComponent } from "src/app/shared/image-upload/image-upload.component";
import { ProjectService } from "src/app/_services/db/project.service";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { MultipleImageUploadComponent } from "src/app/shared/multiple-image-upload/multiple-image-upload.component";
import { ProjectTypeService } from "src/app/_services/db/project-type.service";

@Component({
  selector: "app-add-project",
  templateUrl: "./add-project.component.html",
  styleUrls: ["./add-project.component.scss"]
})
export class AddProjectComponent implements OnInit {
  public projectId;
  public projectForm: FormGroup;
  public projectTypes;
  public isLoading = false;

  @ViewChild("displayPicture", { static: false })
  displayPicture: ImageUploadComponent;

  @ViewChild("pictures", { static: false })
  pictures: MultipleImageUploadComponent;

  constructor(
    private utilsService: UtilsService,
    private projectService: ProjectService,
    private location: Location,
    private route: ActivatedRoute,
    private projectTypeService: ProjectTypeService
  ) {
    this.projectId = this.route.snapshot.paramMap["params"]["id"];
    this.projectForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null),
      projectTypeId: new FormControl(null, Validators.required),

      location: new FormControl(null, Validators.required),
      owner: new FormControl(null),
      consultant: new FormControl(null),
      supervision: new FormControl(null),
      contractor: new FormControl(null),
      developingYear: new FormControl(null),
      cost: new FormControl(null),
      scope: new FormControl(null),

      displayPicture: new FormControl(""),
      pictures: new FormControl([])
    });
  }

  ngOnInit() {
    this.fetch();
    this.fetchProjectTypes();
  }

  async fetchProjectTypes() {
    let response = await this.projectTypeService.getProjectTypes();
    this.projectTypes = response["projectTypes"];
  }

  async fetch() {
    if (this.projectId) {
      let response = await this.projectService.getProject(this.projectId);
      this.projectForm.patchValue(response["project"]);
    }
  }

  async submit() {
    if (this.projectForm.invalid) {
      this.utilsService.forwardErrorMessage(
        "Failed to save because some fields are empty."
      );
      return;
    }

    this.isLoading = true;

    try {
      let displayPicture = await this.displayPicture.upload();
      if (displayPicture != null) {
        this.projectForm.patchValue({ displayPicture: displayPicture });
      }
    } catch (error) {
      this.utilsService.forwardErrorMessage(
        "Failed to upload the profile picture."
      );
    }

    try {
      let pictures = await this.pictures.upload();
      if (pictures != null) {
        this.projectForm.patchValue({ pictures: pictures });
      }
    } catch (error) {
      this.utilsService.forwardErrorMessage("Failed to upload the pictures.");
    }

    try {
      if (this.projectId) {
        await this.projectService.updateProject(
          this.projectId,
          this.projectForm.value
        );
      } else {
        await this.projectService.addProject(this.projectForm.value);
      }
      this.location.back();
    } catch (error) {
      this.utilsService.forwardErrorMessage("Failed to save project.");
    }
    this.isLoading = false;
  }
}
