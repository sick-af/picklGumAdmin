import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CategoryService } from "src/app/_services/db/category.service";
import { UtilsService } from "src/app/_services/utils/utils.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-add-variant",
  templateUrl: "./add-variant.component.html",
  styleUrls: ["./add-variant.component.scss"],
})
export class AddVariantComponent implements OnInit {
  public variantID;
  public variantForm: FormGroup;
  public loading = 0;
  public categories: any;
  public selectedCategory;
  public first_attribute;
  public second_attribute;
  public third_attribute;
  public images;
  public image;

  config = {
    displayKey: "name", //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    height: "auto", //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: "select category", // text to be displayed when no item is selected defaults to Select,
    customComparator: () => {}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 0, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: "more", // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: "No results found!", // text to be displayed when no items are found while searching
    searchPlaceholder: "Search", // label thats displayed in search input,
    searchOnKey: "name", // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    clearOnSelection: false, // clears search criteria when an option is selected if set to true, default is false
  };
  constructor(
    private utilService: UtilsService,
    public categoryService: CategoryService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.variantID = this.route.snapshot.paramMap["params"]["id"];

    this.variantForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      base_rate: new FormControl(null, Validators.required),
      sku: new FormControl(null, Validators.required),
      first_attribute_value: new FormControl(null),
      second_attribute_value: new FormControl(null),
      third_attribute_value: new FormControl(null),
      inventory_management: new FormControl("shopify"),
      images: new FormControl(),
      category: new FormControl(),
    });
  }

  ngOnInit() {
    this.fetch();
    this.fetchCategories();
  }

  async fetch() {
    if (this.variantID) {
      let res = await this.categoryService.getVariant(this.variantID);
      this.variantForm.patchValue(res);

      this.selectedCategory = res["category"];
      this.variantForm.patchValue({ category: this.selectedCategory.id });

      this.categoryService
        .getImages(this.variantID, this.variantForm.value.category)
        .then((images) => {
          this.images = images["images"];
        });
    }
  }
  categorySelected(category) {
    this.variantForm.patchValue({ category: category.value.id });
        
    this.first_attribute = category.value.first_attribute;
    this.second_attribute = category.value.second_attribute;
    this.third_attribute = category.value.third_attribute;
    
    console.log(this.variantForm.value);
  }
  deleteImage(idx) {
    let image = this.images[idx];
    this.categoryService.deleteImage(image.id).then((res) => {
      this.fetch();
    });
  }
  fetchCategories() {
    this.categoryService.getCategories().then((categories) => {
      this.categories = categories;
    });
  }
  async submit() {
    this.loading++;

    try {
      if (this.variantID) {
        await this.categoryService.updateVariant(
          this.variantForm.value,
          this.variantID
        );
        this.uploadImages(this.image, this.variantID);

        this.utilService.handleSuccess("Variant updated successfully!");
      } else {
        let variant = await this.categoryService.createVariant(
          this.variantForm.value
        );

        this.uploadImages(this.image, variant["id"]);

        this.utilService.handleSuccess("Variant created successfully!");
      }
      this.router.navigate(["/dashboard/variants"]);
    } catch (error) {
      console.log(error);
      this.utilService.forwardErrorMessage("Failed to save Variant.");
    }
    this.loading--;
  }
  handleUpload(e) {
    this.image = e.target.files[0];
    this.variantForm.patchValue({ images: e.target.files[0] });
    console.log(this.variantForm.value);
  }
  uploadImages(images, variant_id) {
    let formData = new FormData();
    formData.append("image", this.image);
    this.categoryService.uploadImages(formData, {
      category: this.variantForm.value.category,
      file_name: this.image.name,
      variant: variant_id,
      model: "categories",
    });

    // this.categoryService
    //   .uploadImagesToDrive(this.variantForm.value.category, variant_id)
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
  }
}
