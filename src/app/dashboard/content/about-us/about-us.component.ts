import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AboutUsService } from "src/app/_services/db/about-us.service";
import { UtilsService } from "src/app/_services/utils/utils.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-about-us",
  templateUrl: "./about-us.component.html",
  styleUrls: ["./about-us.component.scss"]
})
export class AboutUsComponent implements OnInit {
  aboutUsForm: FormGroup;
  aboutUsId: String;
  public isLoading = false;

  constructor(
    private aboutUsService: AboutUsService,
    private utilsService: UtilsService,
    private location: Location
  ) {
    this.aboutUsForm = new FormGroup({
      description: new FormControl(null, Validators.required),
      mission: new FormControl(null, Validators.required),
      vision: new FormControl(null, Validators.required),
      experience: new FormControl(null, Validators.required),
      message: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
      facebookLink: new FormControl(null, Validators.required),
      instagramLink: new FormControl(null, Validators.required),
      twitterLink: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
    this.fetch();
  }

  async fetch() {
    let response = await this.aboutUsService.get();
    if (response["aboutUs"] && response["aboutUs"].length > 0) {
      this.aboutUsId = response["aboutUs"][0]["id"];
      this.aboutUsForm.patchValue(response["aboutUs"][0]);
    }
  }

  async submit() {
    this.isLoading = true;
    try {
      if (this.aboutUsId) {
        await this.aboutUsService.update(
          this.aboutUsId,
          this.aboutUsForm.value
        );
      } else {
        await this.aboutUsService.create(this.aboutUsForm.value);
      }

      this.utilsService.handleSuccess(
        "Successfully updated your About Us information."
      );

      await this.fetch();
    } catch (error) {
      this.utilsService.forwardErrorMessage(
        "Failed to update your About Us information."
      );
    }
    this.isLoading = false;
  }
}
