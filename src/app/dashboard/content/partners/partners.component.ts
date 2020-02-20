import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-partners",
  templateUrl: "./partners.component.html",
  styleUrls: ["./partners.component.scss"]
})
export class PartnersComponent implements OnInit {
  constructor() {}

  public partners = [];
  public cols = [
    { value: "titleEn", title: "Name", visible: true },
    { value: "titleAr", visible: false }
  ];

  ngOnInit() {}
}
