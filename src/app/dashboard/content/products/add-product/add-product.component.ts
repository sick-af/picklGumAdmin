import { Component, OnInit, ViewChild, ViewChildren } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UtilsService } from "src/app/_services/utils/utils.service";
import { ImageUploadComponent } from "src/app/shared/image-upload/image-upload.component";
import { ProductService } from "src/app/_services/db/product.service";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { MultipleImageUploadComponent } from "src/app/shared/multiple-image-upload/multiple-image-upload.component";

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.scss"]
})
export class AddProductComponent implements OnInit {
  public productId;
  public productForm: FormGroup;
  public isLoading = false;

  @ViewChild("displayPicture", { static: false })
  displayPicture: ImageUploadComponent;

  @ViewChild("pictures", { static: false })
  pictures: MultipleImageUploadComponent;

  constructor(
    private utilsService: UtilsService,
    private productService: ProductService,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.productId = this.route.snapshot.paramMap["params"]["id"];
    this.productForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      displayPicture: new FormControl(""),
      pictures: new FormControl([])
    });
  }

  ngOnInit() {
    this.fetch();
  }

  async fetch() {
    if (this.productId) {
      let response = await this.productService.getProduct(this.productId);
      this.productForm.patchValue(response["product"]);
    }
  }

  async submit() {
    if (this.productForm.invalid) {
      this.utilsService.forwardErrorMessage(
        "Failed to save because some fields are empty."
      );
      return;
    }
    this.isLoading = true;

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
      if (this.productId) {
        await this.productService.updateProduct(
          this.productId,
          this.productForm.value
        );
      } else {
        await this.productService.addProduct(this.productForm.value);
      }
      this.location.back();
    } catch (error) {
      this.utilsService.forwardErrorMessage("Failed to save product.");
    }
    this.isLoading = false;
  }
}
