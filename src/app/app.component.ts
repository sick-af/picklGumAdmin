import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UtilsService } from "./_services/utils/utils.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "pickle-gum";

  constructor(
    private utilsService: UtilsService,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    this.subscribeToastr();
  }

  subscribeToastr() {
    this.utilsService.toastObjValue.subscribe(toastObj => {
      if (!toastObj) return;
      if (toastObj.errorFlag)
        this.toastService.error("", toastObj.message, {
          timeOut: 3000
        });
      else
        this.toastService.success("", toastObj.message, {
          timeOut: 3000
        });
    });
  }
}
