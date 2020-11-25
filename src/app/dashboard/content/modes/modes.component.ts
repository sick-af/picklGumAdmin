import { Component, OnInit } from "@angular/core";
import { ModeService } from "src/app/_services/db/mode.service";
import { UtilsService } from "src/app/_services/utils/utils.service";

@Component({
  selector: "app-modes",
  templateUrl: "./modes.component.html",
  styleUrls: ["./modes.component.scss"],
})
export class ModesComponent implements OnInit {
  public modes;
  public isLoading = false;
  public cols = [{ value: "name", title: "Name", visible: true }];

  constructor(
    private modeService: ModeService,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.fetchModes();
  }
  async fetchModes() {
    this.modes = await this.modeService.fetchAll();
  }
  async delete(id) {
    try {
      await this.modeService.deleteMode(id);
      this.fetchModes();
      this.utilsService.handleSuccess(`Mode successfully deleted!`);
    } catch (error) {
      this.utilsService.forwardErrorMessage("failed to delete mode");
    }
  }
}
