import { Component, OnInit, ViewChild, ViewChildren } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UtilsService } from "src/app/_services/utils/utils.service";
import { CarouselService } from "src/app/_services/db/carousel.service";
import { Location } from "@angular/common";
import { MultipleImageUploadComponent } from "src/app/shared/multiple-image-upload/multiple-image-upload.component";

@Component({
  selector: "app-carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.scss"]
})
export class CarouselComponent implements OnInit {
  public carouselForm: FormGroup;

  @ViewChild("pictures", { static: false })
  pictures: MultipleImageUploadComponent;

  constructor(
    private utilsService: UtilsService,
    private carouselService: CarouselService,
    private location: Location
  ) {
    this.carouselForm = new FormGroup({
      pictures: new FormControl([])
    });
  }

  ngOnInit() {
    this.fetch();
  }

  async fetch() {
    let response = await this.carouselService.get();
    this.carouselForm.patchValue(response["carousel"]);
  }

  async submit() {
    try {
      let pictures = await this.pictures.upload();
      if (pictures != null) {
        this.carouselForm.patchValue({ pictures: pictures });
      }
    } catch (error) {
      this.utilsService.forwardErrorMessage("Failed to upload the pictures.");
    }

    try {
      await this.carouselService.update(this.carouselForm.value);
      this.utilsService.handleSuccess("Successfully updated your Carousel");

      await this.fetch();
    } catch (error) {
      this.utilsService.forwardErrorMessage("Failed to save carousel.");
    }
  }
}
