import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ContentRoutingModule } from "./content-routing.module";
import { ContentComponent } from "./content.component";
import { HomeComponent } from "./home/home.component";
import { PartnersComponent } from "./partners/partners.component";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [ContentComponent, HomeComponent, PartnersComponent],
  imports: [CommonModule, ContentRoutingModule, SharedModule]
})
export class ContentModule {}
