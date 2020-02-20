import { Component, OnInit, Input } from "@angular/core";
import { Location } from "@angular/common";

@Component({
  selector: "app-reusable-input-form",
  templateUrl: "./reusable-input-form.component.html",
  styleUrls: ["./reusable-input-form.component.scss"]
})
export class ReusableInputFormComponent implements OnInit {
  @Input()
  title: any;

  @Input()
  backButton: any;

  constructor(private location: Location) {}

  ngOnInit() {}

  goBack() {
    this.location.back();
  }
}
