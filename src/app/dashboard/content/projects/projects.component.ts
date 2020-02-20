import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.scss"]
})
export class ProjectsComponent implements OnInit {
  constructor() {}

  public projects = [];
  public cols = [
    { value: "titleEn", title: "Name", visible: true },
    { value: "titleAr", visible: false }
  ];

  ngOnInit() {}
}
