import { Component, OnInit } from "@angular/core";
import { ApplicationService } from "src/app/_services/db/application.service";
import { UtilsService } from "src/app/_services/utils/utils.service";

@Component({
  selector: "app-applications",
  templateUrl: "./applications.component.html",
  styleUrls: ["./applications.component.scss"]
})
export class ApplicationsComponent implements OnInit {
  constructor(
    private applicationService: ApplicationService,
    private utilsService: UtilsService
  ) {}

  public isLoading = false;
  public applications = [];
  public cols = [
    { value: "name", title: "Name", visible: true },
    { value: "url", title: "Resume", visible: true }
  ];

  ngOnInit() {
    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    try {
      let response = await this.applicationService.getApplications();
      this.applications = response["applications"];
    } catch (error) {
      this.utilsService.forwardErrorMessage("Failed to fetch the applications");
    }
    this.isLoading = false;
  }

  async delete(idx: string) {
    try {
      await this.applicationService.deleteApplication(idx);
      this.utilsService.handleSuccess(
        `Application ${idx} was successfully deleted`
      );
      this.fetch();
    } catch (error) {
      this.utilsService.forwardErrorMessage(
        `Failed to delete Application ${idx}`
      );
    }
  }
}
