import { Component, OnInit } from "@angular/core";
import { ReasonsService } from "src/app/_services/db/reasons.service";
import { UtilsService } from "src/app/_services/utils/utils.service";

@Component({
  selector: "app-reasons",
  templateUrl: "./reasons.component.html",
  styleUrls: ["./reasons.component.scss"],
})
export class ReasonsComponent implements OnInit {
  public isLoading = false;
  public data: any = [];
  public cols = [{ value: "text", title: "Reason", visible: true }];

  constructor(
    private reasonService: ReasonsService,
    private utilService: UtilsService
  ) {}

  ngOnInit() {
    this.fetch();
  }
  async fetch() {
    this.data = await this.reasonService.fetchReasons();
  }
  async delete(id) {
    try {
      await this.reasonService.deleteReason(id);
      this.fetch();
      this.utilService.handleSuccess(`Reason successfully deleted!`);
    } catch (error) {
      this.utilService.forwardErrorMessage(`failed to delete reason!`);
    }
  }
}
