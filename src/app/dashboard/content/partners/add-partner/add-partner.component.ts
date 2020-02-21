import { Component, OnInit, ViewChild, ViewChildren } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UtilsService } from "src/app/_services/utils/utils.service";
import { ImageUploadComponent } from "src/app/shared/image-upload/image-upload.component";
import { PartnerService } from "src/app/_services/db/partner.service";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { MultipleImageUploadComponent } from "src/app/shared/multiple-image-upload/multiple-image-upload.component";
import { PartnerTypeService } from "src/app/_services/db/partner-type.service";

@Component({
  selector: "app-add-partner",
  templateUrl: "./add-partner.component.html",
  styleUrls: ["./add-partner.component.scss"]
})
export class AddPartnerComponent implements OnInit {
  public partnerId;
  public partnerForm: FormGroup;
  public partnerTypes;

  @ViewChild("displayPicture", { static: false })
  displayPicture: ImageUploadComponent;

  constructor(
    private utilsService: UtilsService,
    private partnerService: PartnerService,
    private partnerTypeService: PartnerTypeService,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.partnerId = this.route.snapshot.paramMap["params"]["id"];
    this.partnerForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      displayPicture: new FormControl(""),
      partnerTypeId: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
    this.fetch();
    this.fetchPartnerTypes();
  }

  async fetch() {
    if (this.partnerId) {
      let response = await this.partnerService.getPartner(this.partnerId);
      this.partnerForm.patchValue(response["partner"]);
    }
  }

  async fetchPartnerTypes() {
    let response = await this.partnerTypeService.getPartnerTypes();
    this.partnerTypes = response["partnerTypes"];
  }

  async submit() {
    if (this.partnerForm.invalid) {
      this.utilsService.forwardErrorMessage(
        "Failed to save because some fields are empty."
      );
      return;
    }

    try {
      let displayPicture = await this.displayPicture.upload();
      if (displayPicture != null) {
        this.partnerForm.patchValue({ displayPicture: displayPicture });
      }
    } catch (error) {
      this.utilsService.forwardErrorMessage(
        "Failed to upload the profile picture."
      );
    }

    try {
      if (this.partnerId) {
        await this.partnerService.updatePartner(
          this.partnerId,
          this.partnerForm.value
        );
      } else {
        await this.partnerService.addPartner(this.partnerForm.value);
      }
      this.location.back();
    } catch (error) {
      this.utilsService.forwardErrorMessage("Failed to save partner.");
    }
  }
}
