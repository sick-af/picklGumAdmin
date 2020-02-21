import { Component, OnInit } from "@angular/core";
import { PartnerService } from "src/app/_services/db/partner.service";
import { UtilsService } from "src/app/_services/utils/utils.service";

@Component({
  selector: "app-partners",
  templateUrl: "./partners.component.html",
  styleUrls: ["./partners.component.scss"]
})
export class PartnersComponent implements OnInit {
  constructor(
    private partnerService: PartnerService,
    private utilsService: UtilsService
  ) {}

  public isLoading = false;
  public partners = [];
  public cols = [{ value: "name", title: "Name", visible: true }];

  ngOnInit() {
    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    try {
      let response = await this.partnerService.getPartners();
      this.partners = response["partners"];
    } catch (error) {
      this.utilsService.forwardErrorMessage("Failed to fetch the partners");
    }
    this.isLoading = false;
  }

  async delete(idx: string) {
    try {
      await this.partnerService.deletePartner(idx);
      this.utilsService.handleSuccess(
        `Partner ${idx} was successfully deleted`
      );
      this.fetch();
    } catch (error) {
      this.utilsService.forwardErrorMessage(`Failed to delete Partner ${idx}`);
    }
  }
}
