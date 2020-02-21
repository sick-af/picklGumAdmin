import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UtilsService } from "src/app/_services/utils/utils.service";
import { PartnerTypeService } from "src/app/_services/db/partner-type.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-add-partner-type",
  templateUrl: "./add-partner-type.component.html",
  styleUrls: ["./add-partner-type.component.scss"]
})
export class AddPartnerTypeComponent implements OnInit {
  public partnerTypeId;
  public partnerTypeForm: FormGroup;

  constructor(
    private utilsService: UtilsService,
    private partnerTypeService: PartnerTypeService,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.partnerTypeId = this.route.snapshot.paramMap["params"]["id"];
    this.partnerTypeForm = new FormGroup({
      name: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
    this.fetch();
  }

  async fetch() {
    if (this.partnerTypeId) {
      let response = await this.partnerTypeService.getPartnerType(
        this.partnerTypeId
      );
      this.partnerTypeForm.patchValue(response["partnerType"]);
    }
  }

  async submit() {
    if (this.partnerTypeForm.invalid) {
      this.utilsService.forwardErrorMessage(
        "Failed to save because some fields are empty."
      );
      return;
    }

    try {
      if (this.partnerTypeId) {
        await this.partnerTypeService.updatePartnerType(
          this.partnerTypeId,
          this.partnerTypeForm.value
        );
      } else {
        await this.partnerTypeService.addPartnerType(
          this.partnerTypeForm.value
        );
      }
      this.location.back();
    } catch (error) {
      this.utilsService.forwardErrorMessage("Failed to save partner type.");
    }
  }
}
