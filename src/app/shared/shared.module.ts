import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProgressSpinnerComponent } from "./progress-spinner/progress-spinner.component";
import { ReusableDataTableComponent } from "./reusable-data-table/reusable-data-table.component";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [ProgressSpinnerComponent, ReusableDataTableComponent],
  imports: [RouterModule, FormsModule, CommonModule],
  exports: [ProgressSpinnerComponent, ReusableDataTableComponent]
})
export class SharedModule {}
