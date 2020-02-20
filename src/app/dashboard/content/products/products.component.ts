import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"]
})
export class ProductsComponent implements OnInit {
  constructor() {}

  public products = [];
  public cols = [
    { value: "titleEn", title: "Name", visible: true },
    { value: "titleAr", visible: false }
  ];

  ngOnInit() {}
}
