import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "app-save-button",
  templateUrl: "./save-button.component.html",
  styleUrls: ["./save-button.component.scss"]
})
export class SaveButtonComponent implements OnInit {
  @Input()
  isLoading: any;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  async submit() {
    this.onSubmit.emit();
  }
}
