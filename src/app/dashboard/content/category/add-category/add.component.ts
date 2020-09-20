import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UtilsService } from "src/app/_services/utils/utils.service";
import { CategoryService } from "src/app/_services/db/category.service";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/_services/auth/auth.service";
import { Location } from "@angular/common";
import { promise } from "protractor";
class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.scss"],
})
export class AddComponent implements OnInit {
  public categoryID;
  public categoryForm: FormGroup;
  public variantForm: FormGroup;
  public isLoading = false;
  public variants = [];
  public variant;
  public cols = [
    { title: "Name" },
    { title: "Base Rate" },
    { title: "Height" },
    { title: "Width" },
    { title: "Mockup Image" },
    { title: "Smart Image" },
  ];

  constructor(
    private utilsService: UtilsService,
    private categoryService: CategoryService,
    private location: Location,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.categoryID = this.route.snapshot.paramMap["params"]["id"];
    this.categoryForm = new FormGroup({
      name: new FormControl(null, Validators.required),
    });
    this.variantForm = new FormGroup({
      variant_name: new FormControl(null, Validators.required),
      height: new FormControl(null, Validators.required),
      width: new FormControl(null, Validators.required),
      base_rate: new FormControl(null, Validators.required),
      mockup_img: new FormControl(null),
      smart_mockup_img: new FormControl(null),
    });
  }

  ngOnInit() {
    this.fetch();
  }
  handleUpload(e, condition) {
    console.log(e.target.files[0]);
    const file: File = e.target.files[0];
    const reader = new FileReader();
    let image;
    reader.addEventListener("load", (event: any) => {
      image = new ImageSnippet(event.target.result, file);
      this.variantForm.value[condition] = {
        name: image.file.name,
        src: image.src,
        type: image.file.type,
      };
    });

    reader.readAsDataURL(file);
  }

  changeField(new_value, column, idx) {
    this.variants[idx][column] = new_value;
    console.log(this.variants[idx]);
  }
  addVariant() {
    this.variants.push({
      ...this.variantForm.value,
      variant_name: this.variantForm.value.variant_name,
      inventory_management: "shopify",
    });
    this.variantForm.reset();
  }
  deleteVariant(idx) {
    this.variants.splice(idx, 1);
  }
  async fetch() {
    if (this.categoryID) {
      let response = await this.categoryService.getCategory(this.categoryID);
      this.categoryForm.patchValue(response);
      this.categoryForm.controls["name"].disable();
      this.variants = response["variants"];
      // delete response["name"];
      // this.variantForm.patchValue(response);
    }
  }

  async submit() {
    if (this.categoryForm.invalid) {
      this.utilsService.forwardErrorMessage(
        "Failed to save because some fields are empty."
      );
      return;
    }
    this.isLoading = true;

    try {
      let body = { ...this.categoryForm.value, variants: this.variants };
      if (this.categoryID) {
        await this.categoryService.updateCategory(this.categoryID, body);
        await this.categoryService.updateDrive(body);
        this.utilsService.handleSuccess(
          "Categories Updated and inserted into google drive!"
        );
      } else {
        await this.categoryService.createCategory(body);
        await this.categoryService.uploadToGoogleDrive(body);
        this.utilsService.handleSuccess(
          "Categorie Created and inserted into google drive!"
        );
      }

      this.location.back();
    } catch (error) {
      this.utilsService.forwardErrorMessage("Failed to save category.");
    }
    this.isLoading = false;
  }
}
