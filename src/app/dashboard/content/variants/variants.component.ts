import { Component, OnInit } from "@angular/core";
import { UtilsService } from "src/app/_services/utils/utils.service";
import { CategoryService } from "src/app/_services/db/category.service";

@Component({
  selector: "app-variants",
  templateUrl: "./variants.component.html",
  styleUrls: ["./variants.component.scss"],
})
export class VariantsComponent implements OnInit {
  public isLoading = false;
  public data: any = [];
  public cols = [
    { value: "name", title: "Name", visible: true },
    { value: "category", title: "Category", visible: true, object: true },
  ];
  constructor(
    private utilService: UtilsService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.fetch();
  }
  async fetch() {
    this.data = await this.categoryService.getVariants();
  }

  async delete(idx: string) {
    let variant = await this.categoryService.getVariant(idx);

    try {
      await this.categoryService.deleteVariant(idx);
      this.utilService.handleSuccess(`Variant ${idx} was successfully deleted`);
      this.fetch();
    } catch (error) {
      this.utilService.forwardErrorMessage(`Failed to delete Variant ${idx}`);
    }
  }
}
