import { Component, OnInit } from "@angular/core";
import { CategoryService } from "src/app/_services/db/category.service";
import { UtilsService } from "src/app/_services/utils/utils.service";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"],
})
export class CategoryComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private utilService: UtilsService
  ) {}
  public isLoading = false;
  public data: any = [];
  public cols = [{ value: "name", title: "Name", visible: true }];

  ngOnInit() {
    this.fetch();
  }
  async fetch() {
    this.data = await this.categoryService.getCategories();
  }
  async delete(idx: string) {
    let category = await this.categoryService.getCategory(idx);
    this.categoryService.deleteFolder({ name: category["name"] });

    try {
      await this.categoryService.deleteCategory(idx);
      this.utilService.handleSuccess(
        `Category ${idx} was successfully deleted`
      );
      this.fetch();
    } catch (error) {
      this.utilService.forwardErrorMessage(`Failed to delete category ${idx}`);
    }
  }
}
