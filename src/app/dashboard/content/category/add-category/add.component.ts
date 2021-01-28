import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { UtilsService } from "src/app/_services/utils/utils.service";
import { CategoryService } from "src/app/_services/db/category.service";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/_services/auth/auth.service";
import { Location } from "@angular/common";
import { promise, $ } from "protractor";
import { ModeService } from "src/app/_services/db/mode.service";
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
  public modes;
  public activeMode;
  public images;
  public cols = [{ title: "Name" }, { title: "Base Rate" }];

  @ViewChild("fileInput", { static: false })
  myFileInput: ElementRef;

  constructor(
    private utilsService: UtilsService,
    private categoryService: CategoryService,
    private location: Location,
    private route: ActivatedRoute,
    private authService: AuthService,
    private modeService: ModeService
  ) {
    this.categoryID = this.route.snapshot.paramMap["params"]["id"];
    this.categoryForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      mode: new FormControl(null),
    });
    this.variantForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      base_rate: new FormControl(null, Validators.required),
      inventory_management: new FormControl("shopify"),
      images: new FormControl(),
    });
  }
  modesConfig = {
    displayKey: "name", //if objects array passed which key to be displayed defaults to description
    height: "auto", //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: "select mode", // text to be displayed when no item is selected defaults to Select,
    customComparator: () => {}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 0, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    clearOnSelection: false, // clears search criteria when an option is selected if set to true, default is false
  };
  patchMode(mode) {
    this.categoryForm.patchValue({
      mode: mode.id,
    });
    this.activeMode = mode;
  }

  ngOnInit() {
    this.fetch();
    this.fetchModes();
  }

  async fetchModes() {
    this.modes = await this.modeService.fetchAll();
  }

  handleUpload(e) {
    this.images = e.target.files;
  }

  changeField(new_value, column, idx) {
    this.variants[idx][column] = new_value;
  }

  addVariant() {
    this.variantForm.patchValue({ images: JSON.stringify(this.images) });
    this.variants.push(this.variantForm.value);
    this.variantForm.reset();
    this.images = [];
    this.myFileInput.nativeElement.value = "";
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
      this.activeMode = response["mode"];
    }
  }

  uploadImages(category) {
    let promises = [];
    this.variants.forEach((variant) => {
      variant.images.forEach((image) => {
        console.log(image);
        let formData: FormData = new FormData();
        formData.append("image", image);
        formData.append("category", category.id);
        let promise = this.categoryService.uploadImages(formData);
        promises.push(promise);
      });
    });
    Promise.all(promises)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
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
      let body = { category: this.categoryForm.value };
      if (this.categoryID) {
        await this.categoryService.updateCategory(this.categoryID, body);
        // await this.categoryService.updateDrive(body);
        this.utilsService.handleSuccess(
          "Categories Updated and inserted into google drive!"
        );
      } else {
        let category = await this.categoryService.createCategory(body)[
          "category"
        ];
        this.uploadImages(category);
        // await this.categoryService.uploadToGoogleDrive(body);
        this.utilsService.handleSuccess(
          "Categories Created and inserted into google drive!"
        );
      }

      this.location.back();
    } catch (error) {
      this.utilsService.forwardErrorMessage("Failed to save category.");
    }
    this.isLoading = false;
  }
}
