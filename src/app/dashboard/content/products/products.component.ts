import { Component, OnInit } from "@angular/core";
import { UtilsService } from "src/app/_services/utils/utils.service";
import { ProductService } from "src/app/_services/db/product.service";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"]
})
export class ProductsComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private utilsService: UtilsService
  ) {}

  public isLoading = false;
  public products = [];
  public cols = [{ value: "name", title: "Name", visible: true }];

  ngOnInit() {
    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    try {
      let response = await this.productService.getProducts();
      this.products = response["products"];
    } catch (error) {
      this.utilsService.forwardErrorMessage("Failed to fetch the products");
    }
    this.isLoading = false;
  }

  async delete(idx: string) {
    try {
      await this.productService.deleteProduct(idx);
      this.utilsService.handleSuccess(
        `Product ${idx} was successfully deleted`
      );
      this.fetch();
    } catch (error) {
      this.utilsService.forwardErrorMessage(`Failed to delete Product ${idx}`);
    }
  }
}
