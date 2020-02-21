import { Component, OnInit } from "@angular/core";
import { UtilsService } from "src/app/_services/utils/utils.service";
import { PartnerTypeService } from "src/app/_services/db/partner-type.service";

@Component({
  selector: "app-partner-types",
  templateUrl: "./partner-types.component.html",
  styleUrls: ["./partner-types.component.scss"]
})
export class PartnerTypesComponent implements OnInit {
  constructor(
    private partnerTypeService: PartnerTypeService,
    private utilsService: UtilsService
  ) {}

  public isLoading = false;
  public partnerTypes = [];
  public cols = [{ value: "name", title: "Name", visible: true }];

  ngOnInit() {
    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    try {
      let response = await this.partnerTypeService.getPartnerTypes();
      this.partnerTypes = response["partnerTypes"];
    } catch (error) {
      this.utilsService.forwardErrorMessage("Failed to fetch the partnerTypes");
    }
    this.isLoading = false;
  }

  async delete(idx: string) {
    try {
      await this.partnerTypeService.deletePartnerType(idx);
      this.utilsService.handleSuccess(
        `PartnerType ${idx} was successfully deleted`
      );
      this.fetch();
    } catch (error) {
      this.utilsService.forwardErrorMessage(
        `Failed to delete PartnerType ${idx}`
      );
    }
  }
}
