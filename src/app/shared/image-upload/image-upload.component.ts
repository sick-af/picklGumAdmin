import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-image-upload",
  templateUrl: "./image-upload.component.html",
  styleUrls: ["./image-upload.component.scss"]
})
export class ImageUploadComponent implements OnInit {
  public imagePath;
  imgURL: any;
  public message: string;

  constructor() {}

  ngOnInit() {}

  preview(files) {
    if (files.length === 0) return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = _event => {
      this.imgURL = reader.result;
    };
  }
}
