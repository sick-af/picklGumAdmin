import {
  Component,
  OnInit,
  ElementRef,
  Input,
  HostListener
} from "@angular/core";
import { MediaService } from "src/app/_services/media/media.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpEventType } from "@angular/common/http";

@Component({
  selector: "app-image-upload",
  templateUrl: "./image-upload.component.html",
  styleUrls: ["./image-upload.component.scss"]
})
export class ImageUploadComponent implements OnInit {
  public imagePath;
  imgURL: any;
  @Input() progress;

  public files;

  constructor(
    private host: ElementRef<HTMLInputElement>,
    public mediaService: MediaService
  ) {}

  ngOnInit() {}

  preview(files) {
    if (files.length === 0) return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = _event => {
      this.imgURL = reader.result;
    };

    this.files = files[0];
  }

  async upload() {
    try {
      if (this.files == null) {
        return;
      }
      var formData = new FormData();
      formData.append("file", this.files);

      return this.mediaService.upload(formData);
    } catch (error) {
      throw error;
    }
  }
}
