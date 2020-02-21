import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UtilsService } from "src/app/_services/utils/utils.service";
import { AdminService } from "src/app/_services/db/admin.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-add-admin",
  templateUrl: "./add-admin.component.html",
  styleUrls: ["./add-admin.component.scss"]
})
export class AddAdminComponent implements OnInit {
  public adminId;
  public adminForm: FormGroup;

  constructor(
    private utilsService: UtilsService,
    private adminService: AdminService,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.adminId = this.route.snapshot.paramMap["params"]["id"];
    this.adminForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
    this.fetch();
  }

  async fetch() {
    if (this.adminId) {
      let response = await this.adminService.getAdmin(this.adminId);
      this.adminForm.patchValue(response["admin"]);
    }
  }

  async submit() {
    if (this.adminForm.invalid) {
      this.utilsService.forwardErrorMessage(
        "Failed to save because some fields are empty."
      );
      return;
    }

    try {
      if (this.adminId) {
        await this.adminService.updateAdmin(this.adminId, this.adminForm.value);
      } else {
        await this.adminService.addAdmin(this.adminForm.value);
      }
      this.location.back();
    } catch (error) {
      this.utilsService.forwardErrorMessage("Failed to save admin.");
    }
  }
}
