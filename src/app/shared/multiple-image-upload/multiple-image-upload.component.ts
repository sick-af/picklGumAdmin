import { Component, OnInit, Input } from "@angular/core";
import { MediaService } from "src/app/_services/media/media.service";

@Component({
  selector: "app-multiple-image-upload",
  templateUrl: "./multiple-image-upload.component.html",
  styleUrls: ["./multiple-image-upload.component.scss"]
})
export class MultipleImageUploadComponent implements OnInit {
  public imagePath;
  @Input() images: any;
  public files = [];

  constructor(public mediaService: MediaService) {}

  ngOnInit() {}

  async preview(files) {
    if (files.length === 0) return;

    var filesArray = Array.prototype.slice.call(files);
    return Promise.all(
      filesArray.map(async file => {
        const url = await this.fileToDataURL(file);
        this.files.push(file);
        this.images.push({
          url: url,
          upload: true,
          fileIdx: this.files.length - 1
        });
      })
    );
  }

  fileToDataURL(file) {
    var reader = new FileReader();
    return new Promise(function(resolve, reject) {
      reader.onload = function(event) {
        resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    });
  }

  async upload() {
    try {
      if (this.files == null) {
        return;
      }

      var formData = new FormData();
      await this.images.map(element => {
        if (element.upload == true) {
          formData.append("files", this.files[element.fileIdx]);
        }
      });

      let response = await this.mediaService.upload(formData);
      let newUploadedPictures = response["body"]["pictures"];
      this.images = await this.images.filter(img => img["upload"] == null);
      let results = [...this.images, ...newUploadedPictures];

      return results;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
