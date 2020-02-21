import { Component, OnInit, ViewChild, ViewChildren } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UtilsService } from "src/app/_services/utils/utils.service";
import { ImageUploadComponent } from "src/app/shared/image-upload/image-upload.component";
import { ProductService } from "src/app/_services/db/product.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.scss"]
})
export class AddProductComponent implements OnInit {
  constructor(
    private utilsService: UtilsService,
    private productService: ProductService,
    private location: Location
  ) {}

  public productForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    displayPicture: new FormControl(""),
    pictures: new FormControl([])
  });

  @ViewChild("displayPicture", { static: false })
  displayPicture: ImageUploadComponent;

  @ViewChild("pictures", { static: false })
  pictures: ImageUploadComponent;

  ngOnInit() {}

  async submit() {
    if (this.productForm.invalid) {
      this.utilsService.forwardErrorMessage(
        "Failed to save because some fields are empty."
      );
      return;
    }

    try {
      let displayPicture = await this.displayPicture.upload();
      if (displayPicture != null) {
        this.productForm.patchValue({ displayPicture: displayPicture });
      }
    } catch (error) {
      this.utilsService.forwardErrorMessage(
        "Failed to upload the profile picture."
      );
    }

    try {
      let pictures = await this.pictures.upload();
      if (pictures != null) {
        this.productForm.patchValue({ pictures: pictures });
      }
    } catch (error) {
      this.utilsService.forwardErrorMessage("Failed to upload the pictures.");
    }

    try {
      this.productService.addProduct(this.productForm.value);
      this.location.back();
    } catch (error) {
      this.utilsService.forwardErrorMessage("Failed to save to product.");
    }
  }
}
