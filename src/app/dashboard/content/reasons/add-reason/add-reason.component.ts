import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UtilsService } from "src/app/_services/utils/utils.service";
import { ReasonsService } from "src/app/_services/db/reasons.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-add-reason",
  templateUrl: "./add-reason.component.html",
  styleUrls: ["./add-reason.component.scss"],
})
export class AddReasonComponent implements OnInit {
  public reasonID;
  public reasonForm: FormGroup;
  public isLoading = false;

  constructor(
    private utilService: UtilsService,
    private reasonService: ReasonsService,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.reasonID = this.route.snapshot.paramMap["params"]["id"];
    this.reasonForm = new FormGroup({
      text: new FormControl(null, Validators.required),
    });
  }

  ngOnInit() {
    this.fetch();
  }
  async fetch() {
    if (this.reasonID) {
      let response = await this.reasonService.fetchReason(this.reasonID);
      this.reasonForm.patchValue(response);
    }
  }

  async submit() {
    if (this.reasonForm.invalid) {
      this.utilService.forwardErrorMessage(
        "Failed to save because some fields are empty."
      );
      return;
    }
    this.isLoading = true;

    try {
      if (this.reasonID) {
        await this.reasonService.updateReason(
          this.reasonID,
          this.reasonForm.value
        );
        this.utilService.handleSuccess("reason updated successfully!");
      } else {
        await this.reasonService.createReason(this.reasonForm.value);
        this.utilService.handleSuccess("reason created successfully!");
      }
      this.location.back();
    } catch (error) {
      this.utilService.forwardErrorMessage("Failed to save reason.");
    }
    this.isLoading = false;
  }
}
