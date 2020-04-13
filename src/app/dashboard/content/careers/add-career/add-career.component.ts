import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ImageUploadComponent } from "src/app/shared/image-upload/image-upload.component";
import { MultipleImageUploadComponent } from "src/app/shared/multiple-image-upload/multiple-image-upload.component";
import { UtilsService } from "src/app/_services/utils/utils.service";
import { CareerService } from "src/app/_services/db/career.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-add-career",
  templateUrl: "./add-career.component.html",
  styleUrls: ["./add-career.component.scss"]
})
export class AddCareerComponent implements OnInit {
  public careerId;
  public careerForm: FormGroup;
  public isLoading = false;

  constructor(
    private utilsService: UtilsService,
    private careerService: CareerService,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.careerId = this.route.snapshot.paramMap["params"]["id"];
    this.careerForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      opening: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
    this.fetch();
  }

  async fetch() {
    if (this.careerId) {
      let response = await this.careerService.getCareer(this.careerId);
      this.careerForm.patchValue(response["career"]);
    }
  }

  async submit() {
    if (this.careerForm.invalid) {
      this.utilsService.forwardErrorMessage(
        "Failed to save because some fields are empty."
      );
      return;
    }

    this.isLoading = true;
    try {
      if (this.careerId) {
        await this.careerService.updateCareer(
          this.careerId,
          this.careerForm.value
        );
      } else {
        await this.careerService.addCareer(this.careerForm.value);
      }
      this.location.back();
    } catch (error) {
      this.utilsService.forwardErrorMessage("Failed to save career.");
    }
    this.isLoading = false;
  }
}
