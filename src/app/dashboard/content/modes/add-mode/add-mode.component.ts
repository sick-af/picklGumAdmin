import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UtilsService } from "src/app/_services/utils/utils.service";
import { ModeService } from "src/app/_services/db/mode.service";
import { ActivatedRoute, Router } from "@angular/router";
declare var $: any;

@Component({
  selector: "app-add-mode",
  templateUrl: "./add-mode.component.html",
  styleUrls: ["./add-mode.component.scss"],
})
export class AddModeComponent implements OnInit {
  public modeID;
  public modeForm: FormGroup;
  public isLoading = false;
  options;
  constructor(
    private utilService: UtilsService,
    private modeService: ModeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.options = {
      canvas: false,
      hasColors: false,
      hasScale: false,
      hasPattern: false,
      hasCenter: false,
    };
    this.modeID = this.route.snapshot.paramMap["params"]["id"];
    this.modeForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      options: new FormControl(this.options),
    });
  }

  ngOnInit() {
    this.fetch();
  }
  handleOpts(opt, value) {
    this.options[opt] = value;
    this.modeForm.patchValue({ options: this.options });
  }
  async fetch() {
    if (this.modeID) {
      let res = await this.modeService.fetchMode(this.modeID);
      this.modeForm.patchValue(res);
      for (const key in res["options"]) {
        this.options[key] = res["options"][key];
        $(`#${key}`).prop("checked", res["options"][key]);
      }
      console.log(this.options);
    }
  }

  async submit() {
    if (this.modeForm.invalid) {
      this.utilService.forwardErrorMessage(
        "Failed to save because some fields are empty."
      );
      return;
    }
    this.isLoading = true;

    try {
      if (this.modeID) {
        await this.modeService.updateMode(this.modeID, this.modeForm.value);
        this.utilService.handleSuccess("Mode updated successfully!");
      } else {
        await this.modeService.createMode(this.modeForm.value);
        this.utilService.handleSuccess("Mode created successfully!");
      }
      this.router.navigate(["/dashboard/modes"]);
    } catch (error) {
      this.utilService.forwardErrorMessage("Failed to save Mode.");
    }
    this.isLoading = false;
  }
}
