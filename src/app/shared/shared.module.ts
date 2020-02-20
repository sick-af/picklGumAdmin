import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProgressSpinnerComponent } from "./progress-spinner/progress-spinner.component";
import { ReusableDataTableComponent } from "./reusable-data-table/reusable-data-table.component";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { ReusableInputFormComponent } from "./reusable-input-form/reusable-input-form.component";
import { ImageUploadComponent } from "./image-upload/image-upload.component";

@NgModule({
  declarations: [
    ProgressSpinnerComponent,
    ReusableDataTableComponent,
    ReusableInputFormComponent,
    ImageUploadComponent
  ],
  imports: [RouterModule, FormsModule, CommonModule],
  exports: [
    ProgressSpinnerComponent,
    ReusableDataTableComponent,
    ReusableInputFormComponent,
    ImageUploadComponent
  ]
})
export class SharedModule {}
