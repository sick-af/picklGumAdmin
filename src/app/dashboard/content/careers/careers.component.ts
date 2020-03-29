import { Component, OnInit } from "@angular/core";
import { CareerService } from "src/app/_services/db/career.service";
import { UtilsService } from "src/app/_services/utils/utils.service";

@Component({
  selector: "app-careers",
  templateUrl: "./careers.component.html",
  styleUrls: ["./careers.component.scss"]
})
export class CareersComponent implements OnInit {
  constructor(
    private careerService: CareerService,
    private utilsService: UtilsService
  ) {}

  public isLoading = false;
  public careers = [];
  public cols = [
    { value: "title", title: "Title", visible: true },
    { value: "opening", title: "Opening", visible: true }
  ];

  ngOnInit() {
    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    try {
      let response = await this.careerService.getCareers();
      this.careers = response["careers"];
    } catch (error) {
      this.utilsService.forwardErrorMessage("Failed to fetch the careers");
    }
    this.isLoading = false;
  }

  async delete(idx: string) {
    try {
      await this.careerService.deleteCareer(idx);
      this.utilsService.handleSuccess(`Career ${idx} was successfully deleted`);
      this.fetch();
    } catch (error) {
      this.utilsService.forwardErrorMessage(`Failed to delete Career ${idx}`);
    }
  }
}
