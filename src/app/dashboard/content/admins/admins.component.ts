import { Component, OnInit } from "@angular/core";
import { AdminService } from "src/app/_services/db/admin.service";
import { UtilsService } from "src/app/_services/utils/utils.service";

@Component({
  selector: "app-admins",
  templateUrl: "./admins.component.html",
  styleUrls: ["./admins.component.scss"],
})
export class AdminsComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private utilsService: UtilsService
  ) {}

  public isLoading = false;
  public admins = [];
  public cols = [{ value: "username", title: "Username", visible: true }];

  ngOnInit() {
    // this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    try {
      let response = await this.adminService.getAdmins();
      this.admins = response["admins"];
    } catch (error) {
      this.utilsService.forwardErrorMessage("Failed to fetch the admins");
    }
    this.isLoading = false;
  }

  async delete(idx: string) {
    try {
      await this.adminService.deleteAdmin(idx);
      this.utilsService.handleSuccess(`Admin ${idx} was successfully deleted`);
      this.fetch();
    } catch (error) {
      this.utilsService.forwardErrorMessage(`Failed to delete Admin ${idx}`);
    }
  }
}
